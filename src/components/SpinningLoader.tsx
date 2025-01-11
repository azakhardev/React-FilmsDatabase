import React from "react";

const SpinningLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-scree">
      <div className="relative w-24 h-24 rounded-full border-8 border-t-indigo-500 border-b-indigo-300 border-l-indigo-300 border-r-indigo-300 animate-spin"></div>
    </div>
  );
};

export default SpinningLoader;
