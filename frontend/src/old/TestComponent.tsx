import React,{useEffect,useState} from 'react';
import { QuestionServiceClient } from './QuestionsServiceClientPb';
import { SearchRequest, Question} from './questions_pb';


const TestComponent: React.FC = () => {
  // State variables
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Instantiate the gRPC client
  const client = new QuestionServiceClient('http://localhost:8080', null, null);

  // Function to make the gRPC call
  const testGrpcCall = () => {
    const request = new SearchRequest();
    request.setQuery('Rearrange'); // Set a test query
    request.setPage(1);
    request.setPagesize(10);
    request.setTypefilter('ANAGRAM'); // Set a test type filter if needed

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err);
        setError(err.message);
        return;
      }

      const questionsList = response.getQuestionsList();
      setQuestions(questionsList);
    });
  };

  // Call the function when the component mounts
  useEffect(() => {
    testGrpcCall();
  },);

  return (
    <div>
      <h2>TestComponent</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3>{question.getTitle()}</h3>
              <p>Type: {question.getType()}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};

export default TestComponent;