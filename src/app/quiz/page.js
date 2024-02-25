"use client";
import {useEffect,useState} from "react";
import axios from "axios";

const page = () => {
  const [questions, setQuestions] = useState([]);
  const fetchData = async () => {
    console.log("hello")
    const questions = await axios.get("http://localhost:3000/api/questions");
    console.log(questions);

  }
  useEffect(() => {
    fetchData();
  }, []);
  return <div>quiz page</div>;
};

export default page;
