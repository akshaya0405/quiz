"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableCaption,
} from "../../components/ui/table";

import Loading from "../../components/Loading";

export const revalidateTime = 10;

const convertTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await fetch("/api/leaderboard", {
          cache: "no-store",
        });
        const res = await leaderboardResponse.json();
        setLeaderboard(res.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(leaderboard);

  if (leaderboard.length === 0) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex justify-center gap-3">
        <div className="relative bg-white w-[150px] h-[70px] rounded-3xl flex items-center justify-center pb-1 pl-1">
          <Image
            src="/logo.png"
            width="300"
            height="300"
            alt="logo"
            // className="border"
          />
        </div>
        <div>
          <img
            src="/logo_new.png"
            alt=""
            className="w-[200px] h-[100px] -mt-2"
          />
        </div>
      </div>
      <Image
        src="/leaderboard.png"
        alt=""
        className="justify-center -mt-4"
        width="250"
        height="70"
      />
      <Table className="bg-white rounded-lg !overflow-hidden w-[1200px] mx-auto caption-top">
        <TableHeader>
          <TableRow className=" border-b-2  border-blue-600">
            <TableHead className="text-center text-blue-700 font-extrabold text-xl">
              Rank
            </TableHead>
            <TableHead className="text-center text-blue-700 font-extrabold text-xl">
              Name
            </TableHead>
            <TableHead className="text-center text-blue-700 font-extrabold text-xl">
              Score
            </TableHead>
            <TableHead className="text-center text-blue-700 font-extrabold text-xl">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.map((user, index) => (
            <TableRow key={user._id} className="border-blue-300">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.score}</TableCell>
              <TableCell className="text-center">
                {convertTime(user.submitTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard; // Change 'leaderboard' to 'Leaderboard'
