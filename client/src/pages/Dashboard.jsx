import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EntryForm from '../components/EntryForm'
import Datatable from '../components/Datatable'
import { useAuth } from "../context/auth.context"
import axios from "axios"
import Chart from '../components/Chart'
import { getDateRange } from '../utils/getDateRange'

function Dashboard() {

    const [data, setdata] = useState(null)
    const [showSummary, setShowSummary] = useState(false);
    const [range, setRange] = useState("");
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);




    function filterData(type) {
        const chartData = useMemo(() => {
            if (!Array.isArray(data)) return [];

            const grouped = data.reduce((acc, item) => {
                // 1. Filter Check: Only proceed if the type is 'expense'
                if (item.type !== type) return acc;

                const category = item.category || 'Other';
                const amount = parseFloat(item.amount) || 0;

                acc[category] = (acc[category] || 0) + amount;
                return acc;
            }, {}); // This returns an OBJECT { grocery: 4700, ... }

            // 2. Convert Object to Array for the Chart
            return Object.keys(grouped).map(key => ({
                name: key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                value: grouped[key]
            }));
        }, [data]);
        return chartData;
    }



    async function getUserData() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/data/fetch`, {}, { withCredentials: true })
            if (res.data.entries.length <= 0) {
                setdata(null)
            } else {
                setdata(res.data.entries)
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    async function onSubmit(data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/data/create`, data, { withCredentials: true })
            getUserData()
        } catch (error) {
            alert(error?.response?.data?.message)
        }
        console.log(data);

    }
    async function deleteEntry(id) {
        console.log(id);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/data/delete/${id}`, { withCredentials: true })
        } catch (error) {
            alert(error?.response?.data?.message)
        }

    }
    async function deleteAll() {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/data/delete/entries/all`, { withCredentials: true })
        } catch (error) {
            alert(error?.response?.data?.message)
        }

    }



    useEffect(() => {
        getUserData();
    }, [deleteAll, deleteEntry, handleGenerate])




    async function handleGenerate() {
        const { startDate, endDate } = getDateRange(
            range,
            customStartDate,
            customEndDate
        );

        // console.log(startDate, endDate);

        // API call
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/data/summary`, {
                startDate,
                endDate
            }, { withCredentials: true });
            const data = res.data.entries;

            if (!data || data.length === 0) {
                setIncome(0);
                setExpense(0);
                return;
            }

            let totalIncome = 0;
            let totalExpense = 0;

            data.forEach((entry) => {
                const amount = Number(entry.amount);

                if (entry.type === "income") {
                    totalIncome += amount;
                } else if (entry.type === "expense") {
                    totalExpense += amount;
                }
            });

            setIncome(totalIncome);
            setExpense(totalExpense);


            setShowSummary(true)


        } catch (error) {
            alert(error)
        }
    }




    return (
        <>
            <Navbar />
            <div className='p-10'>
                <div className='flex items-stretch justify-start gap-4'>
                    <EntryForm onSubmit={onSubmit} />
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-white font-semibold mb-4">
                            Expense Summary
                        </h2>

                        <Chart data={filterData("expense")} />
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-white font-semibold mb-4">
                            Income Summary
                        </h2>

                        <Chart data={filterData("income")} />
                    </div>

                    {/* //reports section */}
                    <div className="bg-gray-800 p-4 rounded-lg space-y-4 flex-1">
                        <h2 className="text-white font-semibold text-lg">
                            Balance Summary
                        </h2>

                        {/* Range Selector */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">
                                Time Period
                            </label>

                            <select
                                value={range}
                                onChange={(e) => {
                                    setRange(e.target.value);
                                    setShowSummary(false); // reset summary when range changes
                                }}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5"
                            >
                                <option value="">Select range</option>
                                <option value="30days">Last 30 days</option>
                                <option value="3months">Last 3 months</option>
                                <option value="6months">Last 6 months</option>
                                <option value="fy">Last financial year</option>
                                <option value="custom">Custom range</option>
                            </select>
                        </div>

                        {/* Custom Date Range */}
                        {range === "custom" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-400">Start Date</label>
                                    <input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-400">End Date</label>
                                    <input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5"
                                    />
                                </div>
                            </div>
                        )}


                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={!range}
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition"
                        >
                            Generate Summary
                        </button>

                        {/* SUMMARY (hidden until generated) */}
                        {showSummary && (
                            <>
                                <div className="border-t border-gray-700 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Total Income</span>
                                        <span className="text-green-400 font-medium">
                                            ₹ {income}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Total Expense</span>
                                        <span className="text-red-400 font-medium">
                                            ₹ {expense}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-700">
                                        <span className="text-white">Net Balance</span>
                                        <span className="text-blue-400">
                                            ₹ {income + expense}
                                        </span>
                                    </div>
                                </div>

                                {/* <button
                                    className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm py-2.5 rounded-lg transition"
                                >
                                    Download PDF
                                </button> */}
                            </>
                        )}
                    </div>
                </div>


                <Datatable data={data} deleteAll={deleteAll} deleteEntry={deleteEntry} />

            </div >
        </>

    )
}

export default Dashboard
