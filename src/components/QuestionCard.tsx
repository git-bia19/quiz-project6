import React from 'react';
import {AnswerObj} from  '../App';
import {Wrapper,ButtonWrapper} from  './QuestionCard.styles';

type Props ={
 question: string;
 answers: string[];
 callback: (e: React.MouseEvent<HTMLButtonElement>) =>void;
 userAns: AnswerObj | undefined ;
 questionNo: number;
 totalQuests: number;
}


export const QuestionCard: React.FC<Props> =  ({
  question,
  answers,
  callback,
  userAns,
  questionNo,
  totalQuests,
}) => (
 <Wrapper>
<p className ="number">
    Question: {questionNo}/{totalQuests}
</p>
<p dangerouslySetInnerHTML = {{__html: question}}/>
    <div>
{answers.map(answer => (
    <ButtonWrapper
        key= {answer}
        correct ={userAns?.correctAns === answer}
        userClicked ={userAns?.answer === answer}
        >
        <button disabled ={userAns ? true: false } value ={answer} onClick = {callback}>
        <span dangerouslySetInnerHTML ={{__html: answer}}/>
        </button>
    </ButtonWrapper>
    ))}
    </div>
</Wrapper>
);


