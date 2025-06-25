const Answers = (props) => {
  return (
    <ul id="answers">
      {props.answers.map((answer, index) => {
        // Xử lý cả string và object format
        const answerText = typeof answer === 'object' ? answer.text : answer;
        const answerImage = typeof answer === 'object' ? answer.image : null;
        
        const isSelected = props.selectedAnswer === answerText;
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
          <li key={answerText} className="answer">
            <button
              className={classes}
              onClick={() => props.handleSelectAnswer(answerText)}
              disabled={props.answerState !== ''}
            >
              <div className="answer-content">
                {answerImage && (
                  <div className="answer-image">
                    <img 
                      src={answerImage} 
                      alt={`Answer ${index + 1}`} 
                      className="answer-img"
                    />
                  </div>
                )}
                <div className="answer-text">
                  <span className="answer-label" key={index}></span> {answerText}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;