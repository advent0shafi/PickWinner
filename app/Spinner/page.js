"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Spinner() {
  const [result, setResult] = useState(["-", "-", "-"]);
  const symbols = ["🍎", "🍊", "🍋"];

  const spin = () => {
    setResult(
      result.map(() => symbols[Math.floor(Math.random() * symbols.length)])
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center bg-bg-2 bg-cover bg-no-repeat w-[800px] h-[450px] p-10 rounded shadow-lg">
        {/* */}
        <div className="bg-red-900 w-full h-full bg-opacity-45 flex justify-between items-center">
        {result.map((symbol, index) => (
                    <div key={index} className="text-6xl mx-2">
                        {symbol}
                    </div>
                ))} 

        </div>{" "}
      </div>
      <button
        className="mt-10 px-5 py-2 bg-blue-500 text-white rounded"
        onClick={spin}
      >
        Spin
      </button>
    </div>
  );
}
