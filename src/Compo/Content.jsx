import React, { useState } from "react";
import FillBlanks from "./FillBlanks"; // Import FillBlanks component

function Content({ data }) {
  const [startClicked, setStartClicked] = useState(false);

  const handleStartClick = () => {
    setStartClicked(true);
  };

  return (
    <>
      {startClicked ? (
        // Show FillBlanks component only
        <FillBlanks d={data} />
      ) : (
        // Intro screen shown before Start
        <div className="w-full flex justify-center items-center px-4 md:px-6 py-8">
          <div className="w-full max-w-[627px] flex flex-col items-center gap-[64px]">
            <div className="w-full flex flex-col gap-[32px]">
              {/* Image */}
              <div className="flex justify-center items-center">
                <img
                  src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                  alt="icon"
                  className="h-[72px] w-[72px]"
                />
              </div>

              {/* Heading & Description */}
              <div className="w-full flex flex-col gap-[12px] px-2 md:px-0">
                <p className="text-[#0F1010] font-semibold text-[28px] md:text-[40px] leading-[46px] text-center font-['Inter']">
                  Sentence Construction
                </p>
                <p className="text-[#7C8181] font-normal text-[16px] md:text-[20px] leading-[28px] tracking-[-0.01em] text-center font-['Inter']">
                  Select the correct words to complete the sentence by arranging the
                  provided options in the right order.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-[32px] w-full">
                {[
                  { title: "Time Per Question", value: "30 sec" },
                  { title: "Total Question", value: "10" },
                  { title: "Coins", value: "0" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-[16px] md:gap-[32px]">
                    <div className="w-[177px] flex flex-col gap-[16px] text-center">
                      <p className="text-[#2A2D2D] font-medium text-[18px] md:text-[20px] leading-[28px] font-['Inter']">
                        {item.title}
                      </p>
                      <p className="text-[#7C8181] font-medium text-[16px] md:text-[18px] leading-[28px] tracking-[-1%] font-inter">
                        {item.value}
                      </p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:flex justify-center items-center h-full w-[1px]">
                        <img src="src/assets/Line 26.png" className="w-[1px]" alt="divider" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center mt-8">
                <div className="w-full md:w-[296px] h-[42px] gap-[16px] flex flex-col sm:flex-row items-center justify-center">
                  <button className="w-full sm:w-[140px] h-[42px] px-[24px] py-[10px] border border-[#453FE1] rounded-[8px] text-[#453FE1] text-[16px] font-medium flex items-center justify-center gap-[8px]">
                    Back
                  </button>
                  <button
                    className="w-full sm:w-[140px] h-[42px] px-[24px] py-[10px] border border-[#453FE1] rounded-[8px] bg-[#453FE1] text-[16px] font-medium flex items-center justify-center gap-[8px] text-white"
                    onClick={handleStartClick}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
