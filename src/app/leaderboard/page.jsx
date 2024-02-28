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

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await axios.get("/api/leaderboard");
        setLeaderboard(leaderboardResponse.data.users);
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
      <Table className="bg-white rounded-lg !overflow-hidden w-[1200px] mx-auto">
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
          {leaderboard?.map((user) => (
            <TableRow key={user._id} className="border-blue-300">
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.score}</TableCell>
              <TableCell className="text-center">1:01</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard; // Change 'leaderboard' to 'Leaderboard'

<TableRow>
  <TableCell className="border px-4 py-2 flex justify-between">
    <h4></h4>
    <h5></h5>
  </TableCell>
</TableRow>;
