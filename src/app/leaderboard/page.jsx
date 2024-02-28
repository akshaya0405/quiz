"use client";

import axios from "axios";
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
    <div className="flex justify-center items-center gap-5 w-full ml-auto">
      <Table className="bg-white rounded-lg overflow-hidden text-center w-3/4">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-center text-3xl text-blue-600 font-bold">
              Leaderboard
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="border px-4 py-2 flex justify-between">
                <h4>{user.name}</h4>
                <h5>{user.score}</h5>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard; // Change 'leaderboard' to 'Leaderboard'
