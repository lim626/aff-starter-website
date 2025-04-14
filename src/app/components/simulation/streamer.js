"use client";
import { useState, useEffect } from 'react';
import { Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Streamer() {


    const [scrollY, setScrollY] = useState(0);
    const [params, setParams] = useState({
        avg_viewers: 1000,
        streams_per_month: 8,
        num_months: 3,
        cost_per_stream: 500,
        expected_ftds: 50,
        month1_deposit: 200,
        deposit_dist: [1 / 3, 1 / 3, 1 / 3],
        deal_type: 'cpa',
        cpa_payment: 100,
        revenue_share: 0.2,
        wager_race_duration: 7,
        wager_race_uplift: 1.5,
        ggr_ratio: 0.6,
        admin_fee: 0.15,
        bonus_cost: 0.1,
        bonus_per_stream: 100
    });

    const [results, setResults] = useState(null);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calcResults = (params) => {
        let total_streams = params["streams_per_month"] * params["num_months"];
        let total_deposits = 0;
        let monthly_deposits = [];

        for (let i = 0; i < params["num_months"]; i++) {
            let month_deposit = params["expected_ftds"] * (params["month1_deposit"] / params["deposit_dist"][0]) * params["deposit_dist"][i];
            total_deposits += month_deposit;
            monthly_deposits.push(month_deposit);
        }

        let ggr = total_deposits * params["ggr_ratio"];
        if (params["wager_race_duration"] > 0) {
            let race_period_ratio = params["wager_race_duration"] / (params["num_months"] * 30);
            let ggr_uplift = ggr * race_period_ratio * (params["wager_race_uplift"] - 1);
            ggr += ggr_uplift;
        }

        let admin_fees = ggr * params["admin_fee"];
        let bonus_costs = (ggr * params["bonus_cost"] + params["bonus_per_stream"] * total_streams);
        let ngr = ggr - admin_fees - bonus_costs;

        let flat_fee_cost = params["cost_per_stream"] * total_streams;
        let variable_cost = 0;
        if (params["deal_type"] === "cpa") {
            variable_cost = params["cpa_payment"] * total_streams;
        } else if (params["deal_type"] === "revenue_share") {
            variable_cost = ngr * params["revenue_share"];
        } else {
            variable_cost = params["cpa_payment"] * params["expected_ftds"] + ngr * params["revenue_share"];
        }

        let total_cost = flat_fee_cost + variable_cost + bonus_costs;
        let profit = ngr - total_cost;
        let roi = 0
        if (total_cost > 0)
            roi = (profit / total_cost) * 100;

        return {
            total_deposits,
            ggr,
            ngr,
            total_cost,
            profit,
            roi,
            monthly_deposits,
            admin_fees,
            bonus_costs,
            streamer_cost: total_cost
        }
    }

    useEffect(() => {
        // Set initial button text

        // Add event listener for window resize
        window.addEventListener("scroll", handleScroll);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        let res = calcResults(params);
        console.log(res);
        setResults(res);
    }, [params])

    const changeDepositDistribution = (num_months) => {
        let destribution = [];
        for (let i = 0; i < num_months; i++) {
            destribution.push(1 / num_months);
        }
        setParams({
            ...params,
            deposit_dist: destribution
        });
        handleInputChange("num_months", num_months);

    }

    function adjustFollowingPercentages(percentages, changedIndex, newValue) {
        const total = 1;
        const newPercentages = [...percentages];

        // Keep all values before the changed one
        const unchangedSum = newPercentages.slice(0, changedIndex).reduce((sum, val) => sum + val, 0);

        // Assign the new value
        newPercentages[changedIndex] = parseFloat(newValue.toFixed(2));

        // Calculate how much is left to distribute
        const used = unchangedSum + newPercentages[changedIndex];
        const remaining = total - used;

        const afterIndexes = newPercentages
            .map((_, i) => i)
            .filter(i => i > changedIndex);

        const originalSum = afterIndexes.reduce((sum, i) => sum + percentages[i], 0);

        // If no room left to adjust or no "after" indexes, return early
        if (remaining < 0 || afterIndexes.length === 0) {
            return newPercentages;
        }

        // Adjust the remaining values proportionally
        for (let i of afterIndexes) {
            const proportion = percentages[i] / originalSum;
            newPercentages[i] = parseFloat((proportion * remaining).toFixed(2));
        }

        // Final rounding fix (optional)
        const finalTotal = newPercentages.reduce((sum, val) => sum + val, 0);
        const roundingError = parseFloat((total - finalTotal).toFixed(2));
        if (Math.abs(roundingError) > 0) {
            // Add rounding correction to the last item
            const last = newPercentages.length - 1;
            newPercentages[last] = parseFloat((newPercentages[last] + roundingError).toFixed(2));
        }

        return newPercentages;
    }


    return (
        <main className="flex w-full flex-col min-h-screen bg-[#EDEDED]">
            <div
                className="w-full h-full absolute left-0 p-8 pt-12"
                style={{
                    pointerEvents: "none",
                    transform: `translateY(${scrollY * 0.3}px)`
                }}>
                <img src="./img/bg/bg-simuation.png" className=" w-full h-full"></img>
            </div>
            {/* <div
                className="w-full h-full absolute left-0"
                style={{
                    zIndex: -1,
                    transform: `translateY(${scrollY * 0.3 - 700}px)`,
                    pointerEvents: "none",
                }}>
                <img src="./img/bg/bg-simuation.png" className=" w-full h-full"></img>
            </div> */}
            <div className="px-[5%] md:px-[14%] py-[5%] z-[2]">
                <p className="text-3xl md:text-6xl font-bold mb-1 w-full text-center leading-1">Streamer Performance</p>
                <p className="text-3xl md:text-6xl font-bold mb-1 w-full text-center leading-1">Analysis Module</p>
                <div className="text-xl bg-white p-4 rounded-lg shadow mt-8 pb-8">
                    <p className='text-[16px]   mb-4 border-[#BC3AFF] border-2 rounded-[20px] p-2 w-fit'>About this module</p>
                    <p className='text-[14px] text-gray-500'>This module helps casino brands evaluate streamer campaign effectiveness and profitability. Input key parameters like viewer exposure, stream frequency, and costs to calculate GGR, NGR, profitability, and ROI. The model also accounts for wager race impacts on revenue.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {/* Deal Structure */}
                        <div className="px-8">
                            <h2 className="text-xl font-semibold mb-4">Stream Parameters</h2>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Average Viewers per Stream ($)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('avg_viewers', Math.max(0, params.avg_viewers - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.avg_viewers}
                                        onChange={(e) => handleInputChange('avg_viewers', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                              focus:outline-none focus:border-[#BC3AFF]
                              appearance-none text-center
                              [&::-webkit-outer-spin-button]:appearance-none
                              [&::-webkit-inner-spin-button]:appearance-none
                              [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('avg_viewers', params.avg_viewers + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Streams per Month ($)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('streams_per_month', Math.max(0, params.streams_per_month - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.streams_per_month}
                                        onChange={(e) => handleInputChange('streams_per_month', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('streams_per_month', params.streams_per_month + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Number of Months
                                    </label>
                                    <button
                                        onClick={() => changeDepositDistribution(Math.max(0, params.num_months - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.num_months}
                                        onChange={(e) => changeDepositDistribution(parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => changeDepositDistribution(params.num_months + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Cost per Stream
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('cost_per_stream', Math.max(0, params.cost_per_stream - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.cost_per_stream}
                                        onChange={(e) => handleInputChange('cost_per_stream', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('cost_per_stream', params.cost_per_stream + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mb-4 mt-8">Player Metrics</h2>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Expected FTDs (First Month)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('expected_ftds', Math.max(0, params.expected_ftds - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.expected_ftds}
                                        onChange={(e) => handleInputChange('expected_ftds', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('expected_ftds', params.expected_ftds + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Expected Deposit per FTD (First Month)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('month1_deposit', Math.max(0, params.month1_deposit - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.month1_deposit}
                                        onChange={(e) => handleInputChange('month1_deposit', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('month1_deposit', params.month1_deposit + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Deposit Distribution */}
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4 mt-8">Monthly deposit distribution (%)</h2>
                                {Array.from({ length: params.num_months }).map((_, i) => (
                                    <div key={i} className="mt-4 bg-white rounded-[20px] p-4 shadow">
                                        <div className="relative">
                                            <label className="absolute left-4 px-2 text-[#BC3AFF] text-[14px] font-medium z-10">
                                                Month {i + 1}
                                            </label>
                                            <div className="flex items-center space-x-4 px-6 py-4 rounded-[20px]">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    value={params.deposit_dist[i] * 100}
                                                    onChange={(e) => {
                                                        const newValue = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                                                        handleInputChange('deposit_dist', adjustFollowingPercentages(params.deposit_dist, i, newValue / 100));
                                                    }}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                                 [&::-webkit-slider-thumb]:appearance-none
                                 [&::-webkit-slider-thumb]:w-6
                                 [&::-webkit-slider-thumb]:h-6
                                 [&::-webkit-slider-thumb]:rounded-full
                                 [&::-webkit-slider-thumb]:bg-[#BC3AFF]
                                 [&::-webkit-slider-thumb]:border-4
                                 [&::-webkit-slider-thumb]:border-white
                                 [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <span className="min-w-[4rem] text-center text-gray-700 font-medium">
                                                    {(params.deposit_dist[i] * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold mb-4">Deal Structure</h2>
                                {/* Expected FTDs Input */}
                                <div className='mt-4'>


                                    {/* Select container with custom styling */}
                                    <div className="relative shadow  rounded-[20px] p-4 bg-white">
                                        <label className="px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Deal Type
                                        </label>
                                        <div className='flex items-center relative'>
                                            <select
                                                value={params.deal_type}
                                                onChange={(e) => handleInputChange('deal_type', e.target.value)}
                                                className="w-full px-4 py-2 rounded-[20px] bg-white text-gray-700 text-center
                          focus:outline-none focus:border-[#BC3AFF]
                          appearance-none cursor-pointer
                           [&>option]:hover:text-[#BC3AFF]
                          [&>option]:p-4"
                                            >
                                                <option value="cpa" className="hover:bg-[#BC3AFF] hover:text-white p-2">CPA</option>
                                                <option value="revenue_share" className="hover:bg-[#BC3AFF] hover:text-white p-2">revenue_share</option>
                                                <option value="hybrid" className="hover:bg-[#BC3AFF] hover:text-white p-2">hybrid</option>
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
                                </div>

                                <div className='mt-4'>

                                    <div className="relative flex items-center  shadow  rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            CPA payment
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('cpa_payment', Math.max(0, params.cpa_payment - 1))}
                                            className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={params.cpa_payment}
                                            onChange={(e) => handleInputChange('cpa_payment', parseFloat(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                              focus:outline-none focus:border-[#BC3AFF]
                              appearance-none text-center
                              [&::-webkit-outer-spin-button]:appearance-none
                              [&::-webkit-inner-spin-button]:appearance-none
                              [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('cpa_payment', params.cpa_payment + 1)}
                                            className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Average First Month Deposit Input */}
                                <div className='mt-4 items-center w-full shadow rounded-[20px] flex justify-between p-4 items-center bg-white'>
                                    <div className="relative">
                                        <label className="text-[#BC3AFF] text-[14px] font-medium z-10 pl-6">
                                            Revenue Share (%)
                                        </label>
                                        <div className="flex items-center space-x-4 px-6 py-4 rounded-[20px]">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="1"
                                                value={params.revenue_share * 100}
                                                onChange={(e) => handleInputChange('revenue_share', parseFloat(e.target.value) / 100)}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-6
                             [&::-webkit-slider-thumb]:h-6
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-[#BC3AFF]
                             [&::-webkit-slider-thumb]:border-4
                             [&::-webkit-slider-thumb]:border-white
                             [&::-webkit-slider-thumb]:shadow-md
                             [&::-moz-range-thumb]:w-6
                             [&::-moz-range-thumb]:h-6
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-[#BC3AFF]
                             [&::-moz-range-thumb]:border-4
                             [&::-moz-range-thumb]:border-white
                             [&::-moz-range-thumb]:shadow-md
                             [&::-moz-range-thumb]:border-0"
                                            />
                                            <span className="min-w-[4rem] text-center text-gray-700 font-medium">
                                                {(params.revenue_share * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <div className="relative w-24 h-24 mx-auto">
                                            {/* Circular background with 3D effect */}
                                            <div className="w-full h-full rounded-full bg-gray-200 shadow-inner"></div>

                                            {/* Progress circle with 3D effect */}
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    background: `conic-gradient(
                        from 0deg,
                        rgba(188, 58, 255, 0.9) 0deg,
                        rgba(188, 58, 255, 1) ${params.revenue_share * 360}deg,
                        transparent ${params.revenue_share * 360}deg
                      )`,
                                                    borderRadius: '50%',
                                                    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2)',
                                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                                                }}
                                            ></div>

                                            {/* White center circle with 3D effect */}
                                            <div
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"
                                                style={{
                                                    boxShadow: `
                        inset -2px -2px 4px rgba(0,0,0,0.1),
                        inset 2px 2px 4px rgba(255,255,255,0.9),
                        0px 2px 4px rgba(0,0,0,0.1)
                      `
                                                }}
                                            ></div>

                                            {/* Percentage text in center with subtle shadow */}
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span
                                                    className="text-xl font-bold text-[#BC3AFF]"
                                                    style={{
                                                        textShadow: '1px 1px 2px rgba(188, 58, 255, 0.2)'
                                                    }}
                                                >
                                                    {(params.revenue_share * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <h2 className="text-xl font-semibold mb-4 mt-8">Wager Race Parameters</h2>

                                {/* Number of Months Input */}
                                <div className="mt-4">
                                    <div className="relative flex items-center shadow rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Wager Race Duration (Days)
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('wager_race_duration', Math.max(1, params.wager_race_duration - 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max="24"
                                            value={params.wager_race_duration}
                                            onChange={(e) => handleInputChange('wager_race_duration', parseInt(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('wager_race_duration', Math.min(24, params.wager_race_duration + 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="relative flex items-center shadow rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Wager Race GGR Uplift Multiplier
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('wager_race_uplift', Math.max(1, params.wager_race_uplift - 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max="24"
                                            value={params.wager_race_uplift}
                                            onChange={(e) => handleInputChange('wager_race_uplift', parseInt(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('wager_race_uplift', Math.min(24, params.wager_race_uplift + 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                    {/* Revenue and Costs */}
                    <div className="px-8">
                        <h2 className="text-xl font-semibold mb-4 mt-8">Revenue and Costs</h2>
                        <div className="space-y-4">
                            {/* Deposit to GGR Ratio */}
                            <div className="mt-4 flex flex-column">
                                <div className="relative w-full flex flex-col items-start">
                                    <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                                        <div className='w-full md:w-auto flex flex-grow items-center bg-white rounded-full px-4 gap-4 shadow'>
                                            <label className="hidden md:block text-[#BC3AFF] text-[14px] font-medium z-10">
                                                Deposit to GGR Ratio
                                            </label>

                                            <div className="flex items-center space-x-4 py-4 rounded-[20px] flex-grow">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={params.ggr_ratio}
                                                    onChange={(e) => handleInputChange('ggr_ratio', parseFloat(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-[#BC3AFF]
                               [&::-webkit-slider-thumb]:border-4
                               [&::-webkit-slider-thumb]:border-white
                               [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <span className="hidden md:block min-w-[4rem] text-center text-gray-700 font-medium">
                                                    {(params.ggr_ratio * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative w-36 md:w-24 h-36 md:h-24 mx-auto">
                                            <div className="w-full h-full rounded-full bg-gray-200 shadow-inner"></div>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    background: `conic-gradient(
                      from 0deg,
                      rgba(188, 58, 255, 0.9) 0deg,
                      rgba(188, 58, 255, 1) ${params.ggr_ratio * 360}deg,
                      transparent ${params.ggr_ratio * 360}deg
                    )`,
                                                    borderRadius: '50%',
                                                    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2)',
                                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-16 md:h-16 bg-white rounded-full"
                                                style={{
                                                    boxShadow: `
                      inset -2px -2px 4px rgba(0,0,0,0.1),
                      inset 2px 2px 4px rgba(255,255,255,0.9),
                      0px 2px 4px rgba(0,0,0,0.1)
                    `
                                                }}
                                            ></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-[17px] font-bold text-[#BC3AFF]">
                                                    {(params.ggr_ratio * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center space-y-2">
                                        {/* Preset percentage buttons */}
                                        <div className="w-full flex justify-between md:justify-start space-x-2 mt-2">
                                            {[0.25, 0.5, 0.75, 1].map((value) => (
                                                <button
                                                    key={value}
                                                    onClick={() => handleInputChange('ggr_ratio', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.ggr_ratio === value
                                                            ? 'bg-[#BC3AFF] text-white'
                                                            : 'bg-white text-black hover:bg-[#BC3AFF] hover:text-white'}`}
                                                >
                                                    {value * 100}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-8 flex flex-column">
                                <div className="relative w-full flex flex-col items-start">
                                    <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                                        <div className='w-full md:w-auto flex flex-grow items-center bg-white rounded-full px-4 gap-4 shadow'>
                                            <label className="hidden md:block text-[#BC3AFF] text-[14px] font-medium z-10">
                                                Admin Fee Percentage
                                            </label>

                                            <div className="flex items-center space-x-4 py-4 rounded-[20px] flex-grow">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    value={params.admin_fee * 100}
                                                    onChange={(e) => handleInputChange('admin_fee', parseFloat(e.target.value) / 100)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-6
                             [&::-webkit-slider-thumb]:h-6
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-[#BC3AFF]
                             [&::-webkit-slider-thumb]:border-4
                             [&::-webkit-slider-thumb]:border-white
                             [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <span className="hidden md:block min-w-[4rem] text-center text-gray-700 font-medium">
                                                    {(params.admin_fee * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative w-36 md:w-24 h-36 md:h-24 mx-auto">
                                            <div className="w-full h-full rounded-full bg-gray-200 shadow-inner"></div>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    background: `conic-gradient(
                      from 0deg,
                      rgba(188, 58, 255, 0.9) 0deg,
                      rgba(188, 58, 255, 1) ${params.admin_fee * 360}deg,
                      transparent ${params.admin_fee * 360}deg
                    )`,
                                                    borderRadius: '50%',
                                                    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2)',
                                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-16 md:h-16 bg-white rounded-full"
                                                style={{
                                                    boxShadow: `
                      inset -2px -2px 4px rgba(0,0,0,0.1),
                      inset 2px 2px 4px rgba(255,255,255,0.9),
                      0px 2px 4px rgba(0,0,0,0.1)
                    `
                                                }}
                                            ></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-[17px] font-bold text-[#BC3AFF]">
                                                    {(params.admin_fee * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col space-y-2">
                                        {/* Preset percentage buttons */}
                                        <div className="w-full flex justify-between md:justify-start space-x-2 mt-2">
                                            {[0.25, 0.5, 0.75, 1].map((value) => (
                                                <button
                                                    key={value}
                                                    onClick={() => handleInputChange('admin_fee', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.adminFeePercent === value
                                                            ? 'bg-[#BC3AFF] text-white'
                                                            : 'bg-white text-black hover:bg-[#BC3AFF] hover:text-white'}`}
                                                >
                                                    {value * 100}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Bonus Cost Percentage */}
                            <div className="mt-8 flex flex-column">
                                <div className="relative w-full flex flex-col items-start">
                                    <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                                        <div className='w-full md:w-auto flex flex-grow items-center bg-white rounded-full px-4 gap-4 shadow'>
                                            <label className="hidden md:block text-[#BC3AFF] text-[14px] font-medium z-10">
                                                Bonus Cost Percentage
                                            </label>

                                            <div className="flex items-center space-x-4 py-4 rounded-[20px] flex-grow">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    value={params.bonus_cost * 100}
                                                    onChange={(e) => handleInputChange('bonus_cost', parseFloat(e.target.value) / 100)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-6
                             [&::-webkit-slider-thumb]:h-6
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-[#BC3AFF]
                             [&::-webkit-slider-thumb]:border-4
                             [&::-webkit-slider-thumb]:border-white
                             [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <span className="min-w-[4rem] text-center text-gray-700 font-medium">
                                                    {(params.bonus_cost * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative w-36 md:w-24 h-36 md:h-24 mx-auto">
                                            <div className="w-full h-full rounded-full bg-gray-200 shadow-inner"></div>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    background: `conic-gradient(
                      from 0deg,
                      rgba(188, 58, 255, 0.9) 0deg,
                      rgba(188, 58, 255, 1) ${params.bonus_cost * 360}deg,
                      transparent ${params.bonus_cost * 360}deg
                    )`,
                                                    borderRadius: '50%',
                                                    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2)',
                                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                                                }}
                                            ></div>
                                            <div
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-16 md:h-16 bg-white rounded-full"
                                                style={{
                                                    boxShadow: `
                      inset -2px -2px 4px rgba(0,0,0,0.1),
                      inset 2px 2px 4px rgba(255,255,255,0.9),
                      0px 2px 4px rgba(0,0,0,0.1)
                    `
                                                }}
                                            ></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-[17px] font-bold text-[#BC3AFF]">
                                                    {(params.bonus_cost * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center space-y-2">
                                        {/* Preset percentage buttons */}
                                        <div className="w-full flex justify-between md:justify-start space-x-2 mt-2">
                                            {[0.25, 0.5, 0.75, 1].map((value) => (
                                                <button
                                                    key={value}
                                                    onClick={() => handleInputChange('bonus_cost', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.bonus_cost === value
                                                            ? 'bg-[#BC3AFF] text-white'
                                                            : 'bg-white text-black hover:bg-[#BC3AFF] hover:text-white'}`}
                                                >
                                                    {value * 100}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Addtional Bonus Cost per steram
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('bonus_per_stream', Math.max(0, params.bonus_per_stream - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.bonus_per_stream}
                                        onChange={(e) => handleInputChange('bonus_per_stream', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('bonus_per_stream', params.bonus_per_stream + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {results && (
                    <div className="mt-40">
                        <div className='relative'>
                            <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">Results</h2>
                            <img src='./img/bg/result-img1.png' className='md:w-auto w-[100px] absolute right-0 bottom-0 transition-transform duration-300 transform hover:animate-scale' />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">${results.total_deposits.toLocaleString()}</p>
                                <h3 className="font-medium">Total Deposits($)</h3>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">${results.ggr.toLocaleString()}</p>
                                <h3 className="font-medium">Gross Gaming Revenue($)</h3>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">${results.ngr.toLocaleString()}</p>
                                <h3 className="font-medium">Net Gaming Revenue($)</h3>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">%{results.roi.toLocaleString()}</p>
                                <h3 className="font-medium">ROI(%)</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                                <p className="text-5xl">${results.profit.toLocaleString()}</p>
                                <h3 className="text-xl">Net Profit($)</h3>
                            </div>
                            <div className='transition-transform duration-300 transform hover:animate-scale'>
                                <img src='./img/bg/result-img2.png' className='w-full' />
                            </div>
                        </div>
                        {/* Monthly Deposits Chart */}
                        <div className="mt-20">
                            <h3 className="text-2xl md:text-5xl text-center font-semibold mb-4">Monthly Deposit Distribution</h3>
                            <Plot
                                data={[{
                                    type: 'bar',
                                    x: results.monthly_deposits.map((_, i) => `Month ${i + 1}`),
                                    y: results.monthly_deposits,
                                    name: 'Monthly Deposits'
                                }]}
                                layout={{
                                    title: 'Expected Monthly Deposits',
                                    xaxis: { title: 'Month' },
                                    yaxis: { title: 'Deposits ($)' }
                                }}
                                style={{ width: '100%', height: '400px' }}
                            />
                        </div>

                        {/* Waterfall Chart */}
                        <div className="mt-8">
                            <h3 className="text-2xl md:text-5xl text-center font-semibold mb-4">Profitability Breakdown</h3>
                            <Plot
                                data={[{
                                    type: 'waterfall',
                                    name: 'Profitability Breakdown',
                                    orientation: 'v',
                                    measure: ['relative', 'relative', 'relative', 'relative', 'relative', 'total'],
                                    x: ['GGR', 'Admin Fees', 'Bonus Costs', 'Streamer Costs', 'Net Profit'],
                                    y: [
                                        results.ggr,
                                        -results.admin_fees,
                                        -results.bonus_costs,
                                        -results.streamer_cost,
                                        results.profit
                                    ],
                                    connector: { line: { color: 'rgb(63, 63, 63)' } }
                                }]}
                                layout={{
                                    title: 'Profitability Breakdown',
                                    showlegend: false
                                }}
                                style={{ width: '100%', height: '400px' }}
                            />
                        </div>

                        {/* Detailed Financial Results */}
                        <div className="mt-8">
                            <h3 className="text-2xl md:text-5xl text-center font-semibold mb-4 text-center py-10">Detailed Financial Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Total Deposits</h3>
                                    <p className="text-4xl">${results.total_deposits.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">GGR</h3>
                                    <p className="text-4xl">${results.ggr.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Admin Fees</h3>
                                    <p className="text-4xl">${results.admin_fees.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Bonus Cost</h3>
                                    <p className="text-4xl">${results.bonus_costs.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">NGR</h3>
                                    <p className="text-4xl">${results.ngr.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Streamer Costs</h3>
                                    <p className="text-4xl">${results.streamer_cost.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Net Profit</h3>
                                    <p className="text-4xl">${results.profit.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">RIO</h3>
                                    <p className="text-4xl">${results.roi.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-center relative'>
                            <img src="./img/simulation.png" className='w-[60%] translate-y-[-10px] md:translate-y-[-30px] z-[-1]'></img>
                        </div>
                        <div className='flex justify-center relative transition-transform duration-300 transform hover:animate-scale'>
                            <img src="./img/simulation1.png" className='w-[40%] translate-y-[-60px] md:translate-y-[-160px] z-[-2] '></img>
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}