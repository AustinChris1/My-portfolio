import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4 w-full md:p-16 p-12 justify-evenly">
        <div className="w-full bg-slate-400 rounded-md"></div>
        <div className="h-12 bg-slate-400 mx-auto mt-3 rounded-md"></div>
        <div className="h-16 bg-slate-400 w-full rounded-md"></div>
        <div className="h-16 bg-slate-400 w-1/2 rounded-md"></div>
        <div className="h-16 bg-slate-400 w-full rounded-md"></div>
        <div className="h-16 bg-slate-400 w-1/2 rounded-md"></div>
        <div className="h-16 bg-slate-400 w-full rounded-md"></div>

      </div>
    </div>
  );
};

export default Loader;
