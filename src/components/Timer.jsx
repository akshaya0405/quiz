import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(120);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };
  useEffect(() => {
    if (localStorage.getItem("timeRemaining"))
      setTimeRemaining(localStorage.getItem("timeRemaining"));
    window.interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);
    return () => window.clearInterval(window.interval);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) window.clearInterval(window.interval);
    localStorage.setItem("timeRemaining", timeRemaining);
  }, [timeRemaining]);

  return (
    <div>
      <Button
        className={cn("w-20", {
          "bg-red-500 hover:bg-red-400": timeRemaining < 20,
          "hover:bg-gray-200": timeRemaining > 20,
        })}
        variant="outline"
      >
        {convertTime(timeRemaining)}
      </Button>
      {/* <Button onClick={() => localStorage.removeItem("timeRemaining")}>
        clear
      </Button>
      <Button onClick={() => window.clearInterval(window.interval)}>
        stop
      </Button> */}
    </div>
  );
};

export default Timer;
