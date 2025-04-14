import React, { useState, useEffect } from "react";
import ScoreSummary from "./SS"; // Score Summary Component

const FillBlanks = ({ d }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [next, setNext] = useState(0);
  const [filledWords, setFilledWords] = useState([]);

  const totalQuestions = d?.data?.questions?.length || 0;
  const currentQuestion = d?.data?.questions[next];
  const rawSentence = currentQuestion?.question || "";
  const options = currentQuestion?.options || [];

  const parts = rawSentence.split(/(_{5,})/); // Detect blanks
  const blanksCount = parts.filter((p) => p.match(/_{5,}/)).length;

  const correctAns = d?.data?.questions?.[next]?.correctAnswer;
  console.log(correctAns);

  // Handle option click to fill blanks
  const handleOptionClick = (opt) => {
    if (!filledWords.includes(opt)) {
      const updated = [...filledWords];

      while (updated.length < blanksCount) {
        updated.push("");
      }

      const index = updated.findIndex((w) => w === "");
      if (index !== -1) {
        updated[index] = opt;
        setFilledWords(updated);
      }
    }
  };

  // Handle filled blank click to clear it
  const handleFilledWordClick = (index) => {
    const updated = [...filledWords];
    updated[index] = "";
    setFilledWords(updated);
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(60); // Reset timer on question change
  }, [next]);

  // Go to next question
  const handleNext = () => {
    if (next < totalQuestions) {
      const currentQ = d.data.questions[next];
      const correctAns = currentQ.correctAnswer;
  
      // Check if all words match in order
      const isCorrect = JSON.stringify(correctAns) === JSON.stringify(filledWords);
  
      // Calculate score based on position-wise correctness
      let score = 0;
      for (let i = 0; i < filledWords.length; i++) {
        if (filledWords[i] === correctAns[i]) {
          score += 10;
        }
      }
  
      const answerObj = {
        question: currentQ.question,
        correctAnswers: correctAns,
        selectedAnswers: filledWords,
        isCorrect,
        score,
      };
  
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  
    if (next < totalQuestions - 1) {
      setNext((prev) => prev + 1);
      setFilledWords([]);
    }
  };
  

  console.log(userAnswers);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const renderSentence = () => {
    let fillIndex = 0;

    return parts.map((part, i) => {
      if (part.match(/_{5,}/)) {
        const currentIndex = fillIndex;
        const filled = filledWords[currentIndex] || "";
        fillIndex++;

        return (
          <span
            key={i}
            onClick={() => handleFilledWordClick(currentIndex)}
            className={`inline-block px-4 py-1 mx-1 min-w-[60px] text-center rounded cursor-pointer ${
              filled
                ? "bg-yellow-300 text-gray-800 font-medium"
                : "border-b-2 border-gray-400"
            }`}
          >
            {filled || "\u00A0"}
          </span>
        );
      } else {
        return (
          <span key={i} className="mx-1 text-gray-700">
            {part}
          </span>
        );
      }
    });
  };

  // Final check
  const isQuizComplete =
    next === totalQuestions - 1 && userAnswers.length === totalQuestions;

  return (
    <div className="w-full flex justify-center items-center p-4 md:p-8 lg:p-12">
      {!isQuizComplete ? (
        <div className="w-full max-w-[975px] min-h-[650px] rounded-[24px] bg-white shadow-[0px_0px_50px_0px_rgba(69,69,69,0.07)] p-6 md:p-10 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <p className="w-[70px] text-[24px] font-semibold text-center text-[rgba(97,100,100,1)]">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </p>
              <button className="px-5 py-2 border border-[rgba(223,227,227,1)] rounded-[8px] text-sm font-medium">
                Quit
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-2 items-end overflow-x-auto">
              {Array.from({ length: totalQuestions }).map((_, index) => (
                <div key={index} className="w-[82px] h-[4px]">
                  <div
                    className={`w-full h-full rounded-full transition-all duration-300 ${
                      index <= next ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Instruction */}
          <div className="text-center text-[20px] font-semibold text-[rgba(97,100,100,1)]">
            Fill in the blanks in any order by selecting words below
          </div>

          {/* Sentence */}
          <div className="w-full max-w-[811px] min-h-[166px] flex flex-col gap-4 bg-gray-50 rounded-xl p-4 self-center text-[16px] leading-relaxed">
            <p className="text-gray-700 flex flex-wrap justify-center">
              {renderSentence()}
            </p>
          </div>

          {/* Options */}
          <div className="w-full flex flex-wrap justify-center items-center gap-6 mt-6">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt)}
                disabled={filledWords.includes(opt)}
                className={`px-4 py-2 h-[44px] rounded-lg border font-semibold transition-all duration-200 ${
                  filledWords.includes(opt)
                    ? "hidden"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <div className="flex justify-end items-center mt-6">
            <button
              className="w-[64px] h-[64px] border border-[rgba(223,227,227,1)] rounded-[8px] text-[16px] font-medium"
              onClick={handleNext}
              disabled={filledWords.includes("")}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <ScoreSummary userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default FillBlanks;
