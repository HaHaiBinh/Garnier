import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  const [isRunning,setIsRunning] = useState(false);
  const handleRunning = () => {
    setIsRunning(true);
  }
  return (
    <>
      <Header />
      <main>
        {!isRunning && <button id="quiz1" onClick={handleRunning}>Start Quiz</button>}
        {isRunning && <Quiz />}
      </main>
    </>
  );
}

export default App;
