import { motion } from 'framer-motion';
import { QuestionType } from '@/types/questionTypes';

interface ContentOnlyQuestionProps {
  question: QuestionType;
}

export const ContentOnlyQuestion = ({ question }: ContentOnlyQuestionProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold">{question.title}</h3>
        
        <div className="prose prose-sm dark:prose-invert">
          {question.blocks?.map((block, index) => (
            <p key={index} className="text-foreground">
              {block.text}
            </p>
          ))}
        </div>

        {question.solution && (
          <div className="mt-6 p-4 bg-accent rounded-lg">
            <p className="text-sm font-medium">
              Additional Information:
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {question.solution}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};