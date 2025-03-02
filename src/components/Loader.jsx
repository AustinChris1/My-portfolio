import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-2xl p-8">
        <div className="w-32 h-32 bg-slate-400 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-3/4 bg-slate-400 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-1/2 bg-slate-400 dark:bg-gray-700 rounded-md"></div>
        <div className="space-y-3 w-full">
          <div className="h-16 bg-slate-400 dark:bg-gray-700 w-full rounded-md"></div>
          <div className="h-16 bg-slate-400 dark:bg-gray-700 w-2/3 rounded-md"></div>
          <div className="h-16 bg-slate-400 dark:bg-gray-700 w-full rounded-md"></div>
          <div className="h-16 bg-slate-400 dark:bg-gray-700 w-1/2 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;