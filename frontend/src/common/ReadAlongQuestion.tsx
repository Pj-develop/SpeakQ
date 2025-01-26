import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionType } from '@/types/questionTypes';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw } from 'lucide-react';

interface ReadAlongQuestionProps {
  question: QuestionType;
}

export const ReadAlongQuestion = ({ question }: ReadAlongQuestionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentBlockIndex(0);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentBlockIndex(-1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{question.title}</h3>
        <p className="text-sm text-muted-foreground">
          Follow along with the highlighted text
        </p>
      </div>

      <div className="space-y-4">
        {question.blocks?.map((block, index) => (
          <motion.div
            key={index}
            animate={{
              backgroundColor: currentBlockIndex === index ? '#e2e8f0' : 'transparent',
              scale: currentBlockIndex === index ? 1.02 : 1,
            }}
            className="p-4 rounded-lg transition-colors"
          >
            {block.text}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={handlePlay}>
          {isPlaying ? (
            <Pause className="w-4 h-4 mr-2" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          {isPlaying ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={reset}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};