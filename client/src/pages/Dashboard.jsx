import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EntryForm from '../components/EntryForm'
import Datatable from '../components/Datatable'
import { useAuth } from "../context/auth.context"
import axios from "axios"

function Dashboard() {

    return (
        <>
            <Navbar />
            <div className='p-10'>
                <EntryForm />
                <Datatable />
            </div>
        </>

    )
}

export default Dashboard
