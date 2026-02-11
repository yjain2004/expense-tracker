import React, { useRef } from 'react'
import { Navbar } from "flowbite-react"
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import axios from "axios"
import { useAuth } from '../context/auth.context'

function Nav() {
    const { logout } = useAuth();
    async function logoutBtn() {
        await logout();

    }

    return (
        <Navbar className='p-6'>
            <Link to="/" className='text-white text-3xl font-medium'>
                <span className='bg-emerald-600 px-2 rounded-md py-1 mr-2 font-bold'>Expense</span>Tracker
            </Link>
            <div className='flex items-center gap-4'>
                <svg className="w-[44px] h-[44px] text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd" />
                </svg>
                <Button color="red" className='cursor-pointer' onClick={() => { logoutBtn() }}>Log out</Button>

            </div>
        </Navbar>
    )
}

export default Nav
