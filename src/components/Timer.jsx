import { useEffect, useState } from "react";

const Timer = (props) => {
  const [remainingTime, setRemainingTime] = useState(props.timeout);

  useEffect(() => {
    const timer = setTimeout(props.onTimeout, props.timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [props.timeout, props.onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={props.timeout} value={remainingTime} className={props.mode} />
  );
};

export default Timer;
