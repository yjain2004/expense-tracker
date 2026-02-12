import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EntryForm from '../components/EntryForm'
import Datatable from '../components/Datatable'
import { useAuth } from "../context/auth.context"
import axios from "axios"

function Dashboard() {


    const [data, setdata] = useState(null)
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
                <EntryForm onSubmit={onSubmit} />
                <Datatable data={data} deleteAll={deleteAll} deleteEntry={deleteEntry} />
            </div>
        </>

    )
}

export default Dashboard
