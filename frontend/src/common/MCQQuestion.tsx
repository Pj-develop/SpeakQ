// src/components/questions/MCQQuestion.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QuestionType, OptionType } from '@/types/questionTypes';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle, RefreshCcw } from 'lucide-react';

// Use the version I provided earlier, but update the types to match QuestionType
interface MCQQuestionProps {
  question: QuestionType;
}

export const MCQQuestion = ({ question }: MCQQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (option: OptionType) => {
    if (showResult) return; // Prevent selection after showing result
    
    setSelectedOption(option.text);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (option.isCorrectAnswer) {
      celebrateSuccess();
    }
  };

  const celebrateSuccess = () => {
    const colors = ['#22c55e', '#3b82f6', '#f59e0b'];
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle', 'square'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 },
        colors,
        shapes: ['star'],
      });
    }, 300);
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  };

  // Get the blank position from the title
  const getQuestionParts = () => {
    const parts = question.title.split('_');
    return {
      before: parts[0],
      after: parts[1] || ''
    };
  };

  const { before, after } = getQuestionParts();

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl shadow-lg border border-border">
      {/* Question Title */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">
          <span>{before}</span>
          <span className="px-2 py-1 mx-1 bg-accent rounded-md"></span>
          <span>{after}</span>
        </h3>
        
        <p className="text-sm text-muted-foreground">
          Choose the best answer to complete the sentence
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelect(option)}
            disabled={showResult}
            className={cn(
              "w-full p-4 rounded-lg text-left transition-all duration-200",
              "border-2 border-border hover:border-primary",
              "flex items-center justify-between",
              showResult && option.isCorrectAnswer && "bg-primary/10 border-primary",
              showResult && !option.isCorrectAnswer && selectedOption === option.text && "bg-destructive/10 border-destructive",
              !showResult && "hover:bg-accent",
              "relative overflow-hidden"
            )}
          >
            {/* Option Letter */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-semibold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option.text}</span>
            </div>

            {/* Result Icon */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={cn(
                    "flex items-center gap-2",
                    option.isCorrectAnswer ? "text-primary" : "text-destructive"
                  )}
                >
                  {option.isCorrectAnswer ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    selectedOption === option.text && <XCircle className="w-6 h-6" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetQuestion}
            disabled={!showResult}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          {attempts > 1 && !showResult && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(true)}
              className="text-primary"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Need a Hint?
            </Button>
          )}
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-sm font-medium"
            >
              {selectedOption === question.options?.find(o => o.isCorrectAnswer)?.text ? (
                <span className="text-primary">Great job! 🎉</span>
              ) : (
                <span className="text-destructive">Try again! You can do it! 💪</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-4 bg-accent rounded-lg"
          >
            <p className="text-sm text-foreground">
              Hint: Think about what would make the most sense in the context of work deadlines!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};