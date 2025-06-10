import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuesIndex = userAnswers.length;
  const quizOver = activeQuesIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((answerData) => {
    setUserAnswers((prev) => {
      return [...prev, answerData];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer({ text: null, position: null }),
    [handleSelectAnswer]
  );

  if (quizOver) {
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuesIndex}
        index={activeQuesIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkip={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;