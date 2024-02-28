"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";
import Loading from "../../components/Loading";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedTimeRemaining =
      typeof window !== "undefined" && localStorage.getItem("timeRemaining");
    return storedTimeRemaining ? parseInt(storedTimeRemaining) : 120;
  });

  const fetchData = async () => {
    try {
      let level;
      if (typeof window !== "undefined") {
        console.log(localStorage.getItem("user"));
        level =
          JSON.parse(localStorage.getItem("user")).type === "btech" ? 2 : 1;
      }
      const questions = await axios.get(`/api/questions?level=${level}`);
      console.log(questions);
      setQuestions(questions.data.questions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async () => {
    try {
      window.clearInterval(window.interval);
      const res = await axios.post("/api/users/submit", {
        questions,
        contact: JSON.parse(
          typeof window !== "undefined" && localStorage.getItem("user")
        ).contact,
        timeRemaining,
      });
      // console.log(res);
      setScore(res.data.score);
      // alert(`Your score is ${res.data.score}`);
      typeof window !== "undefined" && localStorage.removeItem("timeRemaining");
      typeof window !== "undefined" && localStorage.removeItem("questions");
      typeof window !== "undefined" && localStorage.removeItem("user");
    } catch (error) {}
  };

  useEffect(() => {
    // console.log(localStorage.getItem("questions"));
  }, []);

  useEffect(() => {
    // if (localStorage.getItem("timeRemaining"))
    //   setTimeRemaining((prev) =>
    //     localStorage.getItem("timeRemaining")
    //       ? localStorage.getItem("timeRemaining")
    //       : 120
    //   );
    if (quizStarted) {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("questions") &&
        JSON.parse(localStorage.getItem("questions")) != 0
      ) {
        setQuestions(
          JSON.parse(
            typeof window !== "undefined" && localStorage.getItem("questions")
          )
        );
      } else fetchData();
      window.interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => window.clearInterval(window.interval);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      window.clearInterval(window.interval);
      onSubmit();
      return;
    } else {
      typeof window !== "undefined" &&
        localStorage.setItem("timeRemaining", timeRemaining);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (questions?.length > 0)
      typeof window !== "undefined" &&
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

  const currentQuestion = questions?.[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions?.length - 1;

  // console.log(currentQuestion?.answers);
  // console.log(questions);

  if (!quizStarted && score === null)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-100/90  w-96 text-center rounded-xl shadow-inner shadow-zinc-400 p-8">
          <h1 className="text-gray-900/90 font-bold text-2xl">Instructions</h1>

          <ul className="text-left mt-4">
            <li className="mb-2">
              <span className="font-bold">1. </span>There are 10 questions in
              total.
            </li>
            <li className="mb-2">
              <span className="font-bold">2. </span>Each question has 4 options.
            </li>
            <li className="mb-2">
              <span className="font-bold">3. </span>Each question carries 1
              mark.
            </li>
            <li className="mb-2">
              <span className="font-bold">4. </span>There is no negative
              marking.
            </li>
            <li className="mb-2">
              <span className="font-bold">5. </span>Time alloted is 2 minutes.
            </li>
          </ul>

          <Button
            onClick={() => {
              toast({ title: "All the best for your quiz!" });

              setQuizStarted(true);
            }}
            className="mt-8"
          >
            {timeRemaining > 0 && timeRemaining != 120 ? "Continue" : "Start"}{" "}
            Quiz
          </Button>
        </div>
      </div>
    );

  if (questions && questions.length === 0) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {quizStarted && score === null && (
        <>
          <Timer timeRemaining={timeRemaining} />
          <div className="w-96 p-8 rounded-xl shadow-inner shadow-zinc-400	 bg-white">
            {currentQuestion && (
              <div>
                <div className="mb-4 flex gap-1">
                  <h3 className="font-bold px-1 pt-3 text-sm text-zinc-500">
                    {" "}
                    QUESTION
                  </h3>
                  <h6 className="text-2xl pt-0.5 font-bold text-zinc-700">
                    {currentQuestionIndex + 1}
                  </h6>
                  <p className="pt-2 text-zinc-500 font-bold">
                    /{questions.length}:
                  </p>
                </div>
                <h3 className="mb-4 text-lg font-semibold">
                  {currentQuestion.question}
                </h3>
                {/* <h4>{currentQuestion.level}</h4> */}
                <ul>
                  {currentQuestion?.answers.map((answer, index) => {
                    return (
                      <li
                        key={index}
                        className={`rounded-lg  h-6 px-3 w-full pb-1 my-2 items-center shadow-sm transition ease-in-out hover:-translate-y-0.5 scale-100 ${
                          answer == currentQuestion.markedAnswer
                            ? "bg-blue-200 border border-blue-500"
                            : "bg-zinc-200 hover:bg-zinc-400 shadow duration-150"
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
                      className="px-4 py-2 rounded bg-blue-500 shadow-md shadow-gray-300 text-white hover:bg-blue-600 focus:outline-none"
                    >
                      Previous
                    </button>
                  )}
                  {isLastQuestion ? (
                    <button
                      onClick={() => onSubmit()}
                      className="px-4 py-2 rounded bg-yellow-500 shadow-md shadow-gray-300 text-white hover:bg-yellow-700 focus:outline-none"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className={`px-4 py-2 rounded bg-blue-500 shadow-md shadow-gray-300 text-white hover:bg-blue-600 focus:outline-none ${
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
        </>
      )}
      {score !== null && (
        <div className="mt-8 flex justify-center flex-col items-center gap-5">
          {score >= 8 && <Confetti width={width} height={height} />}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold">
              {score >= 8
                ? "Congratulations, you have won a prize!"
                : "Better luck next time!!"}
            </h1>
            <p className="text-lg font-semibold mt-4">Your score: {score}</p>
          </div>
          <Button
            // variant="primary"
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            View Leaderboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
