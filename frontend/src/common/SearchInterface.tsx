import { useState, useEffect, useCallback } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/common/QuestionCard";
import { QuestionType } from '@/types/questionTypes';
import { questionService } from "@/services/questionService";


export function SearchInterface() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const questionTypes = ["MCQ", "ANAGRAM", "READ_ALONG", "CONTENT_ONLY"];

  const searchQuestions = useCallback(async (
    searchQuery: string,
    page: number,
    types: string[]
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await questionService.getQuestions({
        query: searchQuery,
        page,
        limit: itemsPerPage,
        type: types.length === 1 ? types[0] : ''
      });

      // Ensure the questions have valid data
      const validQuestions = (response.questions || []).map((question) => {
        return {
          ...question,
          _id: typeof question._id === "string" ? question._id : question._id?.$oid || `temp-${Math.random().toString(36).substr(2, 9)}`,
          type: question.type || "CONTENT_ONLY",
          title: question.title || "Untitled Question",
          blocks: question.blocks || [],
          options: question.options || [],
        };
      });

      setResults(validQuestions as unknown as QuestionType[]);
      setTotalCount(response.count || 0);
    } catch (err) {
      console.error('Error during search:', err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setResults([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string, page: number, types: string[]) => {
      searchQuestions(searchQuery, page, types);
    }, 300),
    [searchQuestions]
  );

  useEffect(() => {
    debouncedSearch(query, currentPage, selectedTypes);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, currentPage, selectedTypes, debouncedSearch]);

  // Initial load
  useEffect(() => {
    searchQuestions('', 1, []);
  }, [searchQuestions]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      setCurrentPage(1);
      return updatedTypes;
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-4 my-5 w-full max-w-3xl">
      <div className="relative mb-6 p-6 rounded-xl bg-card text-card-foreground shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Search Questions</h2>
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            />
          )}
        </div>

        <div className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-muted-foreground" size={20} />
            <input
              type="text"
              className="w-full px-12 py-3 text-base rounded-lg bg-muted text-foreground border-2 border-input hover:border-ring focus:border-ring focus:outline-none transition-all duration-200"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-4 p-1 rounded-full hover:bg-accent transition-colors"
                  onClick={() => handleSearch("")}
                >
                  <X size={20} className="text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Filter by Type:</h3>
          <div className="flex flex-wrap gap-6">
            {questionTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                  className="data-[state=checked]:bg-primary"
                />
                <span className="text-sm text-foreground">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {loading ? (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
            />
          </div>
        ) : results.length > 0 ? (
          results.map((question) => (
            <QuestionCard key={typeof question._id === 'string' ? question._id : question._id.$oid} question={question} />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">No results found.</div>
        )}
      </motion.div>

      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 max-w-sm"
          >
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <span className="text-destructive">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto p-1 hover:bg-destructive/20 rounded-full transition-colors"
                >
                  <X size={16} className="text-destructive" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
