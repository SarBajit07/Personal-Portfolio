import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "< Sarbajit Timalsina />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050508] text-gray-100 flex flex-col items-center justify-center font-mono">
      <div className="mb-4 text-2xl md:text-3xl font-bold tracking-widest bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
        {text} <span className="animate-blink ml-1">|</span>
      </div>

      <div className="w-[150px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-loading" />
      </div>
    </div>
  );
};
