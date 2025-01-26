// src/types/questionTypes.ts
export interface BlockType {
  text: string;
  showInOption: boolean;
  isAnswer: boolean;
  id?: string; // Added for unique keys in lists
}

export interface OptionType {
  text: string;
  isCorrectAnswer: boolean;
  id?: string; // Added for unique keys in lists
}

export interface QuestionType {
  _id: { $oid: string };
  type: "ANAGRAM" | "MCQ" | "READ_ALONG" | "CONTENT_ONLY";
  title: string;
  anagramType?: "WORD" | "SENTENCE";
  blocks?: BlockType[];
  options?: OptionType[];
  siblingId?: { $oid: string };
  solution?: string;
}