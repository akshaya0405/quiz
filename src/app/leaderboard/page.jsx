"use client";

import Image from "next/image";

import Leaderboard from "../../components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center w-full h-full">
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
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage; // Change 'leaderboard' to 'Leaderboard'
