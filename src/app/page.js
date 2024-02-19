"use client"
import { useState, useRef } from "react";

import StarsCanvas from "@/components/Stars";
import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <div>
      <StarsCanvas  />
      <RegistrationForm />
    </div>
  );
}
