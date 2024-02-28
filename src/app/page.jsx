"use client";

import Image from "next/image";
import RegistrationForm from "../components/RegistrationForm";
import { toast } from "../components/ui/use-toast";

// import StarsCanvas from "../components/Stars";

export default function Home() {
  return (
    <div className="flex px-24 gap-28 justify-center items-center h-full w-full">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="relative bg-white w-[300px] h-[150px] rounded-3xl flex items-center justify-center pl-1">
          <Image
            src="/logo.png"
            width="300"
            height="300"
            alt="logo"
            // className="border"
          />
        </div>
        <div className="text-center">
          <h1 className="text-[#75c7fb] italic font-extrabold text-5xl">
            SUVIDYA&apos;S
          </h1>
          <h1 className="text-red-500 italic font-extrabold text-5xl">
            CHEMTECH QUIZ
          </h1>
        </div>
        <div className="text-center uppercase">
          <h3 className="text-gray-100 font-medium text-lg font-sans">
            Only for Students and Fresh <br />
            graduates
          </h3>
        </div>
      </div>
      {/* <StarsCanvas /> */}

      <RegistrationForm />
     
    </div>
  );
}
