import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-20 bg-[rgba(248,248,248,0.75)] backdrop-blur-[50px] shadow-[0px_2px_36px_0px_rgba(0,0,0,0.08)]">
      {/* Left: Logo or Label */}
      <div className="text-base sm:text-lg font-semibold text-gray-800">
        Main
      </div>

      {/* Center: Title */}
      <div className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 text-center">
        Sentence Construction
      </div>

      {/* Right: Option/Tab */}
      <div className="text-sm sm:text-md text-gray-600">
        Others
      </div>
    </nav>
  );
};

export default Navbar;
