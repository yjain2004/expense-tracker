import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EntryForm from '../components/EntryForm'
import Datatable from '../components/Datatable'
import { useAuth } from "../context/auth.context"
import axios from "axios"
import Chart from '../components/Chart'

function Dashboard() {

    const [data, setdata] = useState(null)

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
            const res = await axios.post("http://localhost:3000/api/data/fetch", {}, { withCredentials: true })
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
            const res = await axios.post("http://localhost:3000/api/data/create", data, { withCredentials: true })
            getUserData()
        } catch (error) {
            alert(error?.response?.data?.message)
        }
        console.log(data);

    }
    async function deleteEntry(id) {
        console.log(id);
        try {
            await axios.delete(`http://localhost:3000/api/data/delete/${id}`, { withCredentials: true })
        } catch (error) {
            alert(error?.response?.data?.message)
        }

    }
    async function deleteAll() {
        try {
            await axios.delete(`http://localhost:3000/api/data/delete/entries/all`, { withCredentials: true })
        } catch (error) {
            alert(error?.response?.data?.message)
        }

    }



    useEffect(() => {
        getUserData();
    }, [deleteAll, deleteEntry])





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
                </div>


                <Datatable data={data} deleteAll={deleteAll} deleteEntry={deleteEntry} />

            </div >
        </>

    )
}

export default Dashboard
