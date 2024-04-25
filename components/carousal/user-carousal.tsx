import Link from "next/link";
import React from "react";

export const UserCarousal:React.FC=()=>{
  return(
    <div >
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div className="max-w-3xl text-center mx-auto mt-32">
          <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Easiest property management application.
          </h1>
        </div>
        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-white">
          Use Our Services
          </p>
        </div>
        <div className="text-center">
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-6 dark:focus:ring-offset-gray-800"
            href="#"
          >
          Get started
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
        {/* End Buttons */}
      </div>
    </div>

  )
}