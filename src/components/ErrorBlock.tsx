import React from "react";

const ErrorBlock: React.FC<{ title: string; message: string }> = (props) => {
  return (
    <div className="flex flex-col gap-3 bg-red-400 px-10 py-5 rounded-2xl">
      <h3 className="font-bold text-[24px] md:text-[32px]">{props.title}</h3>
      <p className="text-[18px]">{props.message}</p>
    </div>
  );
};

export default ErrorBlock;
