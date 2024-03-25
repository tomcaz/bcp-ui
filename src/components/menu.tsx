import Link from 'next/link'
import React from 'react'

const Menu = () => {
    return (
        <div className="flex justify-around bg-gradient-to-b from-violet-500 to-fuchsia-500 h-8 rounded-md ml-10 mr-10">
            <div className='flex justify-around w-1/2 items-center self-center text-white'>
                <div className='w-[150px]'><Link href="/home" className='hover:underline'>Dashboard</Link></div>
                <div className='w-[150px]'><Link href="/user" className='hover:underline'>User</Link></div>
                <div className='w-[150px]'><Link href="/logout" className='hover:underline'>Logout</Link></div>
            </div>
        </div>
    )
}

export default Menu