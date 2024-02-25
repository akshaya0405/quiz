"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";

const page = () => {
  const [questions, setQuestions] = useState([]);
  const fetchData = async () => {
    const questions = await axios.get("http://localhost:3000/api/questions");
    console.log(questions);
    setQuestions(questions.data.questions);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Timer />
    </div>
  );
};

export default page;
