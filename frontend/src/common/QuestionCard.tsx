import { motion } from 'framer-motion';
import { QuestionType } from '@/types/questionTypes';
import { MCQQuestion } from './MCQQuestion';
import { AnagramQuestion } from './AnagramQuestion';
import { ReadAlongQuestion } from './ReadAlongQuestion';
import { ContentOnlyQuestion } from './ContentOnlyQuestion';

interface QuestionCardProps {
  question: QuestionType;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  if (!question || !question._id) {
    console.warn('Invalid question or question ID is missing:', question);
    return null;
  }

  const renderQuestion = () => {
    switch (question.type) {
      case 'MCQ':
        return <MCQQuestion question={question} />;
      case 'ANAGRAM':
        return <AnagramQuestion question={question} />;
      case 'READ_ALONG':
        return <ReadAlongQuestion question={question} />;
      case 'CONTENT_ONLY':
        return <ContentOnlyQuestion question={question} />;
      default:
        return (
          <div className="p-4 text-muted-foreground">
            Unsupported question type: {question.type}
          </div>
        );
    }
  };

  return (
    <motion.div
      key={question._id.$oid}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl shadow-lg p-6 mb-6"
    >
      {renderQuestion()}
    </motion.div>
  );
};