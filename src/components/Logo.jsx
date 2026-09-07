import React from "react";

function Logo({ width = "100px" }) {
  return (
    <>
   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 shadow-md shadow-sky-500/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <h1 className="font-serif text-xl font-bold tracking-tight text-gray-500 group-hover:text-sky-300 transition-colors">
                Field Notes
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400">
                Stories & Ideas
              </p>
            </div>
            </>
  )
}

export default Logo;