import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const Timer = ({ timeRemaining }) => {
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

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
