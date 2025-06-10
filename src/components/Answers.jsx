const Answers = (props) => {
  return (
    <ul id="answers">
      {props.answers.map((answer, index) => {
        const isSelected = props.selectedAnswer === answer;
        let classes = "";
        if (props.answerState === "answered" && isSelected) {
          classes = "selected";
        }
        if (
          (props.answerState === "correct" || props.answerState === "wrong") &&
          isSelected
        ) {
          classes = props.answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              className={classes}
              onClick={() => props.handleSelectAnswer(answer)}
              disabled={props.answerState !== ''}
            >
              <span className="answer-label"key={index}></span> {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
