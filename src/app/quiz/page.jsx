"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(
    localStorage.getItem("timeRemaining")
      ? localStorage.getItem("timeRemaining")
      : 120
  );

  const fetchData = async () => {
    try {
      const questions = await axios.get("http://localhost:3000/api/questions");
      setQuestions(questions.data.questions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    if (timeRemaining <= 0) window.clearInterval(window.interval);
    localStorage.setItem("timeRemaining", timeRemaining);
  }, [timeRemaining]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col justify-center items-center gap-8">
       <Timer timeRemaining={timeRemaining} />
      <div className="w-96 p-8 rounded-lg shadow-md bg-white">
        {currentQuestion && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}:</h2>
            <h3 className="mb-4 text-lg font-semibold">{currentQuestion.question}</h3>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options &&
                currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded border border-gray-300 w-full cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
              {!isFirstQuestion && (
                <button
                  onClick={prevQuestion}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Previous
                </button>
              )}
              {isLastQuestion ? (
                <button
                  onClick={() => console.log("Submit")}
                  className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-700 focus:outline-none"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none ${isFirstQuestion ? "ml-auto" : ""}`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      </div>);
};

export default Page;
