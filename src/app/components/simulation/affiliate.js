"use client";
import { useState, useEffect } from 'react';
import { Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// Calculation functions
const calcTotalDepositPerPlayer = (avgFirstMonthDeposit, depositDistribution) => {
    let life_time_total = avgFirstMonthDeposit / depositDistribution[0];
    let total = 0;
    for (let i = 0; i < depositDistribution.length; i ++) {
        total += life_time_total * depositDistribution[i];
    }
    return total;
};

const calcTotalDeposit = (expectedFtds, totalDepositPerPlayer) => {
    return totalDepositPerPlayer * expectedFtds;
};

const calcGGR = (totalDeposit, depositToGgrRatio) => {
    return totalDeposit * depositToGgrRatio;
};

const calcNGR = (ggr, adminFeePercent, bonusCostPercent) => {
    const adminFee = ggr * adminFeePercent;
    const bonusCost = ggr * bonusCostPercent;
    return ggr - (adminFee + bonusCost);
};

const calcAcquisitionCosts = (dealType, cpaPayment, revenueSharePercent, ggr, ftds, listingFee, flatFee) => {
    switch (dealType) {
        case "cpa":
            return (cpaPayment * ftds) + listingFee + flatFee;
        case "revenue_share":
            return ggr * revenueSharePercent + listingFee + flatFee;
        case "hybrid":
            return (cpaPayment * ftds) + ggr * revenueSharePercent + listingFee + flatFee;
        default:
            return 0;
    }
};

const calcProfitability = (ngr, acquisitionCost) => {
    return ngr - acquisitionCost;
};

const calcROI = (profitability, acquisitionCost) => {
    return (profitability / acquisitionCost) * 100;
};

const calcGrossARPU = (ggr, expectedFtds) => {
    return ggr / expectedFtds;
};

const calcNetARPU = (ngr, expectedFtds) => {
    return ngr / expectedFtds;
};

export default function Affiliate() {

    // State for input parameters
    const [params, setParams] = useState({
        dealType: "cpa",
        cpaPayment: 100,
        revenueSharePercent: 0,
        flatFee: 0,
        listingFee: 1000,
        expectedFtds: 20,
        avgFirstMonthDeposit: 200,
        numMonths: 3,
        depositDistribution: [0.6, 0.25, 0.15],
        depositToGgrRatio: 0.5,
        adminFeePercent: 0.18,
        bonusCostPercent: 0.12,
        casinoTaxes: 0
    });

    // State for results
    const [results, setResults] = useState(null);

    // State for Max CPA Calculator
    const [maxCpaState, setMaxCpaState] = useState({
        totalDeposit: 0,
        ggr: 0,
        ngr: 0,
        netProfit: 0,
        affiliateCost: 0,
        roi: 0
    });

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        // Set initial button text

        // Add event listener for window resize
        window.addEventListener("scroll", handleScroll);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Calculate results when parameters change
    useEffect(() => {
        if (params) {
            const monthlyDeposits = params.depositDistribution.map(dist =>
                params.avgFirstMonthDeposit * params.expectedFtds * dist
            );

            const totalDepositPerPlayer = calcTotalDepositPerPlayer(
                params.avgFirstMonthDeposit,
                params.depositDistribution
            );

            const totalDeposits = calcTotalDeposit(
                params.expectedFtds,
                totalDepositPerPlayer
            );

            const ggr = calcGGR(totalDeposits, params.depositToGgrRatio);
            const ngr = calcNGR(ggr, params.adminFeePercent, params.bonusCostPercent);

            const affiliateCosts = calcAcquisitionCosts(
                params.dealType,
                params.cpaPayment,
                params.revenueSharePercent,
                ggr,
                params.expectedFtds,
                params.listingFee,
                params.flatFee
            );

            const netProfit = calcProfitability(ngr, affiliateCosts);
            const roi = calcROI(netProfit, affiliateCosts);

            const effectiveCpa = params.expectedFtds === 0 ? "-" :
                (params.flatFee + params.listingFee +
                    (params.cpaPayment * params.expectedFtds) +
                    (params.revenueSharePercent * ngr)) / params.expectedFtds;

            setResults({
                monthlyDeposits,
                totalDeposits,
                ggr,
                ngr,
                affiliateCosts,
                adminFees: ggr * params.adminFeePercent,
                bonusCosts: ggr * params.bonusCostPercent,
                casinoTaxes: ggr * params.casinoTaxes,
                netProfit,
                roi,
                effectiveCpa,
                expectedFtds: params.expectedFtds,
                cpa: params.cpaPayment,
                grossARPU: calcGrossARPU(ggr, params.expectedFtds),
                netARPU: calcNetARPU(ngr, params.expectedFtds)
            });

            // Initialize Max CPA Calculator state
            setMaxCpaState({
                totalDeposit: totalDeposits,
                ggr: ggr,
                ngr: ngr,
                netProfit: netProfit,
                affiliateCost: affiliateCosts,
                roi: roi
            });
        }
    }, [params]);

    // Handle input changes
    const handleInputChange = (field, value) => {
        setParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle Max CPA Calculator changes
    const handleMaxCpaChange = (field, value) => {
        setMaxCpaState(prev => {
            const newState = { ...prev, [field]: value };

            // Update dependent values
            switch (field) {
                case 'totalDeposit':
                    newState.ggr = value * params.depositToGgrRatio;
                    newState.ngr = newState.ggr - results.adminFees - results.bonusCosts;
                    newState.netProfit = newState.ngr - newState.affiliateCost;
                    newState.roi = (newState.netProfit / newState.affiliateCost) * 100;
                    break;
                case 'ggr':
                    newState.totalDeposit = value / params.depositToGgrRatio;
                    newState.ngr = value - results.adminFees - results.bonusCosts;
                    newState.netProfit = newState.ngr - newState.affiliateCost;
                    newState.roi = (newState.netProfit / newState.affiliateCost) * 100;
                    break;
                case 'ngr':
                    newState.netProfit = value - newState.affiliateCost;
                    newState.ggr = value + results.adminFees + results.bonusCosts;
                    newState.totalDeposit = newState.ggr / params.depositToGgrRatio;
                    newState.roi = (newState.netProfit / newState.affiliateCost) * 100;
                    break;
                case 'affiliateCost':
                    newState.netProfit = newState.ngr - value;
                    newState.roi = (newState.netProfit / value) * 100;
                    break;
                case 'netProfit':
                    newState.ngr = value + newState.affiliateCost;
                    newState.ggr = newState.ngr + results.adminFees + results.bonusCosts;
                    newState.totalDeposit = newState.ggr / params.depositToGgrRatio;
                    newState.roi = (value / newState.affiliateCost) * 100;
                    break;
                case 'roi':
                    newState.netProfit = (value * newState.affiliateCost) / 100;
                    newState.ngr = newState.netProfit + newState.affiliateCost;
                    newState.ggr = newState.ngr + results.adminFees + results.bonusCosts;
                    newState.totalDeposit = newState.ggr / params.depositToGgrRatio;
                    break;
            }

            return newState;
        });
    };

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
                <p className="text-3xl md:text-6xl font-bold mb-1 w-full text-center leading-1">Affiliate Deal</p>
                <p className="text-3xl md:text-6xl font-bold mb-1 w-full text-center leading-1">Evaluation Module</p>
                <div className="text-xl bg-white p-4 rounded-lg shadow mt-8 pb-8">
                    <p className='text-[16px]   mb-4 border-[#BC3AFF] border-2 rounded-[20px] p-2 w-fit'>About this module</p>
                    <p className='text-[14px] text-gray-500'>This module helps casino brands evaluate the profitability of affiliate marketing deals. Input
                        key parameters about the deal structure and player behavior to calculate Lifetime Deposits,
                        GGR, NGR, Net Profit, ROI, and other important metrics.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {/* Deal Structure */}
                        <div className="px-8">
                            <h2 className="text-xl font-semibold mb-4">Deal Structure</h2>

                            <div className='mt-4'>


                                {/* Select container with custom styling */}
                                <div className="relative shadow  rounded-[20px] p-4 bg-white">
                                    <label className="px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Deal Type
                                    </label>
                                    <div className='flex items-center relative'>
                                        <select
                                            value={params.dealType}
                                            onChange={(e) => handleInputChange('dealType', e.target.value)}
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
                                        Flat Fee ($)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('flatFee', Math.max(0, params.flatFee - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.flatFee}
                                        onChange={(e) => handleInputChange('flatFee', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                              focus:outline-none focus:border-[#BC3AFF]
                              appearance-none text-center
                              [&::-webkit-outer-spin-button]:appearance-none
                              [&::-webkit-inner-spin-button]:appearance-none
                              [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('flatFee', params.flatFee + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        Listing Fee ($)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('listingFee', Math.max(0, params.listingFee - 100))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.listingFee}
                                        onChange={(e) => handleInputChange('listingFee', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('listingFee', params.listingFee + 100)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className="relative flex items-center  shadow  rounded-[20px]">
                                    <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                        CPA Payment ($)
                                    </label>
                                    <button
                                        onClick={() => handleInputChange('cpaPayment', Math.max(0, params.cpaPayment - 1))}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={params.cpaPayment}
                                        onChange={(e) => handleInputChange('cpaPayment', parseFloat(e.target.value))}
                                        className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('cpaPayment', params.cpaPayment + 1)}
                                        className="bg-white shadow-lg  px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

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
                                            value={params.revenueSharePercent * 100}
                                            onChange={(e) => handleInputChange('revenueSharePercent', parseFloat(e.target.value) / 100)}
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
                                            {(params.revenueSharePercent * 100).toFixed(0)}%
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
                        rgba(188, 58, 255, 1) ${params.revenueSharePercent * 360}deg,
                        transparent ${params.revenueSharePercent * 360}deg
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
                                                {(params.revenueSharePercent * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="px-8">
                            <h2 className="text-xl font-semibold mb-4">Player Behavior</h2>
                            <div className="space-y-4">
                                {/* Expected FTDs Input */}
                                <div className="mt-4">
                                    <div className="relative flex items-center shadow rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Expected FTDs
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('expectedFtds', Math.max(0, params.expectedFtds - 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={params.expectedFtds}
                                            onChange={(e) => handleInputChange('expectedFtds', parseInt(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('expectedFtds', params.expectedFtds + 1)}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Average First Month Deposit Input */}
                                <div className="mt-4">
                                    <div className="relative flex items-center shadow rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Average First Month Deposit ($)
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('avgFirstMonthDeposit', Math.max(0, params.avgFirstMonthDeposit - 10))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={params.avgFirstMonthDeposit}
                                            onChange={(e) => handleInputChange('avgFirstMonthDeposit', parseFloat(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('avgFirstMonthDeposit', params.avgFirstMonthDeposit + 10)}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Number of Months Input */}
                                <div className="mt-4">
                                    <div className="relative flex items-center shadow rounded-[20px]">
                                        <label className="absolute top-[10px] left-4 bg-white px-2 text-[#BC3AFF] text-[14px] font-medium mb-2">
                                            Number of Months
                                        </label>
                                        <button
                                            onClick={() => handleInputChange('numMonths', Math.max(1, params.numMonths - 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-14 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max="24"
                                            value={params.numMonths}
                                            onChange={(e) => handleInputChange('numMonths', parseInt(e.target.value))}
                                            className="w-full px-12 py-2 rounded-[20px] bg-white text-gray-700
                            focus:outline-none focus:border-[#BC3AFF]
                            appearance-none text-center
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={() => handleInputChange('numMonths', Math.min(24, params.numMonths + 1))}
                                            className="bg-white shadow-lg px-[9px] py-[2px] rounded-[15px] absolute right-4 text-[#BC3AFF] text-[17px] font-bold z-10 hover:opacity-70"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Deposit Distribution */}
                                <div className="mt-8">
                                    <label className="block text-[#BC3AFF] text-[14px] font-medium mb-4">
                                        Deposit Distribution (%)
                                    </label>
                                    {Array.from({ length: params.numMonths }).map((_, i) => (
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
                                                        value={params.depositDistribution[i] * 100}
                                                        onChange={(e) => {
                                                            const newValue = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                                                            handleInputChange('depositDistribution', adjustFollowingPercentages(params.depositDistribution, i, newValue / 100));
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
                                                        {(params.depositDistribution[i] * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                    </div>

                    {/* Player Behavior */}


                    {/* Revenue and Costs */}
                    <div className="px-8">
                        <h2 className="text-xl font-semibold mb-4">Revenue and Costs</h2>
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
                                                    value={params.depositToGgrRatio}
                                                    onChange={(e) => handleInputChange('depositToGgrRatio', parseFloat(e.target.value))}
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
                                                    {(params.depositToGgrRatio * 100).toFixed(1)}%
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
                      rgba(188, 58, 255, 1) ${params.depositToGgrRatio * 360}deg,
                      transparent ${params.depositToGgrRatio * 360}deg
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
                                                    {(params.depositToGgrRatio * 100).toFixed(1)}%
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
                                                    onClick={() => handleInputChange('depositToGgrRatio', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.depositToGgrRatio === value
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
                                                    value={params.adminFeePercent * 100}
                                                    onChange={(e) => handleInputChange('adminFeePercent', parseFloat(e.target.value) / 100)}
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
                                                    {(params.adminFeePercent * 100).toFixed(1)}%
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
                      rgba(188, 58, 255, 1) ${params.adminFeePercent * 360}deg,
                      transparent ${params.adminFeePercent * 360}deg
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
                                                    {(params.adminFeePercent * 100).toFixed(1)}%
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
                                                    onClick={() => handleInputChange('adminFeePercent', value)}
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
                                                    value={params.bonusCostPercent * 100}
                                                    onChange={(e) => handleInputChange('bonusCostPercent', parseFloat(e.target.value) / 100)}
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
                                                    {(params.bonusCostPercent * 100).toFixed(1)}%
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
                      rgba(188, 58, 255, 1) ${params.bonusCostPercent * 360}deg,
                      transparent ${params.bonusCostPercent * 360}deg
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
                                                    {(params.bonusCostPercent * 100).toFixed(1)}%
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
                                                    onClick={() => handleInputChange('bonusCostPercent', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.bonusCostPercent === value
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

                            {/* Casino Taxes */}
                            <div className="mt-8 flex flex-column">
                                <div className="relative w-full flex flex-col items-start">
                                    <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                                        <div className='w-full md:w-auto flex flex-grow items-center bg-white rounded-full px-4 gap-4 shadow'>
                                            <label className="hidden md:block text-[#BC3AFF] text-[14px] font-medium z-10">
                                                Casino Taxes
                                            </label>

                                            <div className="flex items-center space-x-4 py-4 rounded-[20px] flex-grow">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    value={params.casinoTaxes * 100}
                                                    onChange={(e) => handleInputChange('casinoTaxes', parseFloat(e.target.value) / 100)}
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
                                                    {(params.casinoTaxes * 100).toFixed(1)}%
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
                      rgba(188, 58, 255, 1) ${params.casinoTaxes * 360}deg,
                      transparent ${params.casinoTaxes * 360}deg
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
                                                    {(params.casinoTaxes * 100).toFixed(1)}%
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
                                                    onClick={() => handleInputChange('casinoTaxes', value)}
                                                    className={`px-3 py-1 shadow rounded-[10px] text-2xl font-medium transition-colors
                                  ${params.casinoTaxes === value
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
                        </div>
                    </div>

                </div>

                {/* Results Display */}
                {results && (
                    <div className="mt-20">
                        <div className='relative'>
                            <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">Results</h2>
                            <img src='./img/bg/result-img1.png' className='md:w-auto w-[100px] absolute right-0 bottom-0 transition-transform duration-300 transform hover:animate-scale' />
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">${results.totalDeposits.toLocaleString()}</p>
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
                                <p className="text-4xl">${results.affiliateCosts.toLocaleString()}</p>
                                <h3 className="font-medium">Affiliate Costs($)</h3>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">${results.effectiveCpa.toLocaleString()}</p>
                                <h3 className="font-medium">Effective CPA($)</h3>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-4xl">%{results.roi.toLocaleString()}</p>
                                <h3 className="font-medium">ROI(%)</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                                <p className="text-5xl">${results.netProfit.toLocaleString()}</p>
                                <h3 className="text-xl">Net Profit($)</h3>
                            </div>
                            <div className='transition-transform duration-300 transform hover:animate-scale'>
                                <img src='./img/bg/result-img2.png' className='w-full' />
                            </div>
                        </div>

                        {/* Monthly Deposits Table */}
                        <div className="mt-8">
                            <h3 className="text-2xl md:text-5xl text-center font-semibold mb-4">Monthly Deposits</h3>
                            <div className="bg-white rounded-[40px] shadow overflow-hidden p-8 px-8 md:px-20 md:mx-20 mx-0 mt-8">
                                <div className='w-full flex'>
                                    <p className='w-1/5'></p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed'>METRIC</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pl-4'>AMMOUNT</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>1</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>GGR</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.ggr.toLocaleString()}</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>2</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>Admin Fees</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.adminFees.toLocaleString()}</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>3</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>Bonus Costs</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.bonusCosts.toLocaleString()}</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>4</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>Casino Taxes</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.casinoTaxes.toLocaleString()}</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>5</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>Affiliate Costs</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.affiliateCosts.toLocaleString()}</div>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-1/5 pt-4'>6</p>
                                    <div className='w-2/5 border-b-2 border-black border-dashed mt-4'>Net Profit</div>
                                    <div className='w-2/5 border-b-2 border-l-2 border-black border-dashed pt-4 pl-4'>{results.netProfit.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Deposits Chart */}
                        <div className="mt-8">
                            <h3 className="text-2xl md:text-5xl text-center font-semibold mb-4">Monthly Deposit Distribution</h3>
                            <Plot
                                data={[{
                                    type: 'bar',
                                    x: results.monthlyDeposits.map((_, i) => `Month ${i + 1}`),
                                    y: results.monthlyDeposits,
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
                                    x: ['GGR', 'Admin Fees', 'Bonus Costs', 'Casino Taxes', 'Affiliate Costs', 'Net Profit'],
                                    y: [
                                        results.ggr,
                                        -results.adminFees,
                                        -results.bonusCosts,
                                        -results.casinoTaxes,
                                        -results.affiliateCosts,
                                        results.netProfit
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
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Total Deposits</h3>
                                    <p className="text-4xl">${results.totalDeposits.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">GGR</h3>
                                    <p className="text-4xl">${results.ggr.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Admin Fees</h3>
                                    <p className="text-4xl">${results.adminFees.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Bonus Cost</h3>
                                    <p className="text-4xl">${results.bonusCosts.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Casino Taxes</h3>
                                    <p className="text-4xl">${results.casinoTaxes.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">NGR</h3>
                                    <p className="text-4xl">${results.ngr.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Affiliate Costs</h3>
                                    <p className="text-4xl">${results.affiliateCosts.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Effective CPA per FTD</h3>
                                    <p className="text-4xl">${results.effectiveCpa.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium">Net Profit</h3>
                                    <p className="text-4xl">${results.netProfit.toLocaleString()}</p>
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