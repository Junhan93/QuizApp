import React from 'react';
// Types
import { AnswerObject } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question      : string;
    answers       : string[];
    callback      : (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer   : AnswerObject | undefined;
    questionNo    : number;
    totalQuestions: number;
};


// React.FC will tell that it is a function component, we use the Props here
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNo, 
    totalQuestions, 
}) => (
    <Wrapper>
        <p className ="number">
            Question: {questionNo} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML= {{ __html: question }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key = {answer}
                        correct = {userAnswer?.correctAnswer === answer}
                        userClicked = {userAnswer?.answer === answer}
                >
                    {/* userAnswer needs a boolean value */}
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML = {{ __html: answer }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;