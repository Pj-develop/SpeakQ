// src/components/questions/AnagramQuestion.tsx
import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { QuestionType } from '@/types/questionTypes';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnagramQuestionProps {
  question: QuestionType;
}

export const AnagramQuestion = ({ question }: AnagramQuestionProps) => {
  const [blocks, setBlocks] = useState(
    question.blocks?.map((block, index) => ({
      ...block,
      id: `${question._id.$oid}-${index}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
    })) || []
  );
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    const currentAnswer = blocks.map(b => b.text).join('');
    const isCorrect = currentAnswer === question.solution;

    setAttempts(prev => prev + 1);
    setShowSolution(true);

    if (isCorrect) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const resetQuestion = () => {
    setBlocks(prevBlocks => prevBlocks.sort(() => Math.random() - 0.5));
    setShowSolution(false);
  };

  return (
    <div className="space-y-6">
      {/* Question Title */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{question.title}</h3>
        <p className="text-sm text-muted-foreground">
          {question.anagramType === 'WORD'
            ? 'Rearrange the letters to form a word'
            : 'Rearrange the words to form a sentence'}
        </p>
      </div>

      {/* Blocks */}
      <Reorder.Group
        axis="x"
        values={blocks}
        onReorder={setBlocks}
        className="flex flex-wrap gap-2"
      >
        {blocks.map((block) => (
          <Reorder.Item
            key={block.id}
            value={block}
            className="cursor-move"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-accent rounded-md"
            >
              {block.text}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={checkAnswer} disabled={showSolution}>
            Check Answer
          </Button>
          <Button variant="outline" onClick={resetQuestion}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {attempts > 1 && !showSolution && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSolution(true)}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Show Solution
          </Button>
        )}
      </div>

      {/* Solution */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-accent rounded-lg"
        >
          <p className="font-medium">Solution: {question.solution}</p>
        </motion.div>
      )}
    </div>
  );
};