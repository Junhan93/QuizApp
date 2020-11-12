import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  // create our state here to use it later with {}
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);  // the current number that the user will be on
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0); 
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startTrivia = async () => {
    // when we click start, we trigger API fetch, means we loading something
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    
    // set the score to 0 because we starting from scratch
    setScore(0);

    setUserAnswers([]);

    setNumber(0);

    setLoading(false);
    
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      // Users answer
      const answer = e.currentTarget.value;

      // Check answers against correct value
      const correct= questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS){
      // if we are at the last question, we set game over to true
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <h1>REACT QUIZ</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
    <button className="start" onClick={startTrivia}>
      Start
    </button> ) : null}

    {!gameOver ? <p className="score">Score: {score}</p> : null}
    {loading && <p>Loading Questions...</p>}
    {!loading && !gameOver && (
      // Question card only show when we are not loading and not game over 
      <QuestionCard 
        questionNo = {number + 1} // we dont want to start our questions at #0, so we add +1
        totalQuestions = {TOTAL_QUESTIONS}
        question = {questions[number].question}
        answers = {questions[number].answers}
        userAnswer = {userAnswers ? userAnswers[number] : undefined}
        callback = {checkAnswer}
      />
    )}

    {!gameOver &&
    !loading &&
    userAnswers.length === number + 1 &&
    number !== TOTAL_QUESTIONS - 1 ? (
      <button className="next" onClick={nextQuestion}>
      Next Question
    </button>
    ) : null}
    </Wrapper>
    </>
  );
};

export default App;
