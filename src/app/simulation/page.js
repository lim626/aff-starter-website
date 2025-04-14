"use client";
import { useState, useEffect } from 'react';
import Affiliate from "@/app/components/simulation/affiliate";
import Streamer from "@/app/components/simulation/streamer";

export default function Simulation() {
    const [module_type, setModuleType] = useState("affiliate");


    return (
        <main className="flex w-full flex-col min-h-screen bg-[#EDEDED]">
            <div className="relative shadow rounded-[20px] p-2 bg-white md:w-[350px] m-4">
                <div className='flex items-center relative'>
                    <select
                        value={module_type}
                        onChange={(e) => setModuleType(e.target.value)}
                        className="w-full px-4 py-2 rounded-[20px] bg-white text-gray-700 text-center
                          focus:outline-none focus:border-[#BC3AFF]
                          appearance-none cursor-pointer
                           [&>option]:hover:text-[#BC3AFF]
                          [&>option]:p-4"
                    >
                        <option value="affiliate" className="hover:bg-[#BC3AFF] hover:text-white p-2">Affiliate deal evaluation</option>
                        <option value="streamer" className="hover:bg-[#BC3AFF] hover:text-white p-2">Streamer Performance Analysis</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none top-[50%] translate-y-[-50%]">
                        <svg
                            className="w-5 h-5 text-[#BC3AFF]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            {
                module_type === "affiliate" ?
                <Affiliate/> : <Streamer />
            }
        </main>
    )
}