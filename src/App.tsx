import React,{useState} from 'react';
import './App.css';
import {QuestionCard} from "./components/QuestionCard";
import { Difficulty,QuestionState} from './API';
import {fetchQuizQuests} from "./API";
import { GlobalStyle,Wrapper } from "./App.styles";

const TOTAL_QUESTIONS =10;

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAns: string;
}


const App =() => {
  const [loading,setLoading] =useState(false);
  const [quests,setQuests] =useState<QuestionState[]>([]);
  const [number,setNumber] =useState(0);
  const [userAns,setUserAns] = useState<AnswerObj[]>([]);
 const [score,setScore] =useState(0);
 const [gameOver,setGameOver] =useState(true);
  
  console.log(quests);

  const startTrivia = async () => {
   setLoading(true);
   setGameOver(false);

   const newQuests = await fetchQuizQuests(
     TOTAL_QUESTIONS,
    Difficulty.EASY
   )
   setQuests(newQuests);
   setScore(0);
   setUserAns([]);
   setNumber(0);
   setLoading(false);
  };


  const checkAnswer = (e:any) => {
 if(!gameOver){
   const answer = e.currentTarget.value;

   const correct =quests[number].correct_answer === answer;
   if (correct) setScore((prev) =>prev + 1);
   const AnswerObj = {
     question: quests[number].question,
     answer,
     correct,
     correctAns: quests[number].correct_answer,
   } 
   setUserAns((prev)  => [...prev, AnswerObj] )
 } 
  }
  const nextQuestion = () => {
    const nextQ = number +1;
   
     if (nextQ === TOTAL_QUESTIONS){
       setGameOver(true);
     }
     else{
       setNumber(nextQ);
     }
     }

  return (
    <>
    <GlobalStyle />
    <Wrapper >
    <h1 >React Quiz App</h1>
    {gameOver || userAns.length === TOTAL_QUESTIONS ? (
    <button className = "start" onClick ={startTrivia}>
    Start
    </button>
    ) :null}
    {!gameOver?<p className ='score'>Score:{score}</p>  : null}
    {loading ? <p>Loading Questions...</p> : null}
    {!loading && !gameOver && (
      <QuestionCard 
questionNo ={number +1 }
totalQuests ={TOTAL_QUESTIONS}
question = {quests[number].question}
answers = {quests[number].answers}
userAns = {userAns ? userAns[number]: undefined}
callback = {checkAnswer}
/>
    )}
{!gameOver && !loading && userAns.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
  <button className ='next' onClick ={nextQuestion}>
  Next Question
</button>
) : null }
    </Wrapper>
    </> 
  );
}

export default App;
