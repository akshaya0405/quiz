"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";
import Loading from "../../components/Loading";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedTimeRemaining = localStorage.getItem("timeRemaining");
    return storedTimeRemaining ? parseInt(storedTimeRemaining) : 120;
  });

  const fetchData = async () => {
    try {
      const questions = await axios.get("http://localhost:3000/api/questions");
      setQuestions(questions.data.questions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/submit", {
        questions,
        contact: JSON.parse(localStorage.getItem("user")).contact,
      });
      console.log(res);
      alert(`Your score is ${res.data.score}`);
      localStorage.removeItem("timeRemaining");
      localStorage.removeItem("questions");
      localStorage.removeItem("user");
    } catch (error) {}
  };

  useEffect(() => {
    if (
      localStorage.getItem("questions") &&
      JSON.parse(localStorage.getItem("questions")) != 0
    ) {
      setQuestions(JSON.parse(localStorage.getItem("questions")));
    } else fetchData();
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
    if (timeRemaining <= 0) {
      window.clearInterval(window.interval);
      onSubmit();
      return;
    } else localStorage.setItem("timeRemaining", timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (questions.length > 0)
      localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

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

  // console.log(currentQuestion?.answers);
  // console.log(questions);

  if (questions.length === 0) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Timer timeRemaining={timeRemaining} />
      <div className="w-96 p-8 rounded-lg shadow-md bg-white">
        {currentQuestion && (
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}:
            </h2>
            <h3 className="mb-4 text-lg font-semibold">
              {currentQuestion.question}
            </h3>
            <ul>
              {currentQuestion?.answers.map((answer, index) => {
                return (
                  <li
                    className={`rounded-lg  h-6 px-3 w-full pb-1 my-2 items-center ${
                      answer == currentQuestion.markedAnswer
                        ? "bg-blue-300"
                        : "bg-zinc-100"
                    }`}
                    onClick={() =>
                      setQuestions((prev) =>
                        prev.map((q) => {
                          console.log(q);
                          if (q._id === currentQuestion._id)
                            return { ...q, markedAnswer: answer };
                          else return q;
                        })
                      )
                    }
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
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
                  onClick={() => onSubmit()}
                  className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-700 focus:outline-none"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none ${
                    isFirstQuestion ? "ml-auto" : ""
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
