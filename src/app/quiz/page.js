"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";

const page = () => {
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(
    localStorage.getItem("timeRemaining")
      ? localStorage.getItem("timeRemaining")
      : 120
  );

  const fetchData = async () => {
    const questions = await axios.get("http://localhost:3000/api/questions");
    console.log(questions);
    setQuestions(questions.data.questions);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // if (localStorage.getItem("timeRemaining"))
    //   setTimeRemaining((prev) =>
    //     localStorage.getItem("timeRemaining")
    //       ? localStorage.getItem("timeRemaining")
    //       : 120
    //   );
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
      <Timer timeRemaining={timeRemaining} />
    </div>
  );
};

export default page;
