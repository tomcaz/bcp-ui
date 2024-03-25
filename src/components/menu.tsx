'use client'
import { logoutSession, selectCurrentUser } from '@/lib/features/sessionSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { signOut } from '@/app/actions'

const Menu = () => {

    const dispatch = useAppDispatch()
    const handleLogout = async () => {
        dispatch(logoutSession())
        await signOut()
    }
    const currentUser = useAppSelector(selectCurrentUser)

    if (!currentUser)
        return <></>
    return (
        <div className="flex justify-around bg-gradient-to-b from-violet-500 to-fuchsia-500 h-8 rounded-md ml-10 mr-10">
            <div className='flex justify-around w-1/2 items-center self-center text-white'>
                <div className='w-[150px]'><Link href="/home" className='hover:underline'>Dashboard</Link></div>
                <>{
                    currentUser && currentUser.role === 'admin' &&
                    <div className='w-[150px]'><Link href="/user" className='hover:underline'>User</Link></div>
                }
                </>
                <div className='w-[150px]'><Button className='hover:underline text-white' type='button' onClick={handleLogout} variant="link"><div className="text-white">Logout</div></Button></div>
            </div>
        </div>
    )
}

export default Menu