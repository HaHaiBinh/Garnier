import Timer from "./Timer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions";

const Question = ({ index, onSelectAnswer, onSkip }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    answerPosition: null,
  });

  let timer = 90000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }

  function handleSelectAnswer(answer, position) {
    setAnswer({
      selectedAnswer: answer,
      answerPosition: position,
    });

    setTimeout(() => {
      onSelectAnswer({ text: answer, position: position });
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <Timer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkip : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        handleSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;