import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await axios.post(
          `/api/leaderboard?date=${new Date().getTime()}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        setLeaderboard(leaderboardResponse.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // console.log(leaderboard);

  if (leaderboard.length === 0) return <Loading />;
  return (
    <div className="w-full flex flex-col items-center">
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

export default Leaderboard;
