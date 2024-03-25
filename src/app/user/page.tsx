'use client'

import Col from '@/components/col'
import Row from '@/components/row'
import { loadAllUser, selectUsers } from '@/lib/features/sessionSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect } from 'react'
import UserItem from './user'
import { UserType } from '../common'
import EditUser from './edit-user'

const User = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadAllUser([]))
    }, [])

    const users = useAppSelector(selectUsers)

    return (
        <div className='flex flex-col items-center'>
            {/* body */}
            <div className="w-[1024px]">
                <Row className="justify-around">
                    <Col>
                        <Row>
                            <Col>
                                <div>
                                    User List
                                </div>
                            </Col>
                        </Row>
                        <div className='flex'>
                            <div className='w-[400px]'>
                                <>
                                    {
                                        users && users.map((user: UserType, index) => (<UserItem user={user} key={index} />))
                                    }
                                </>
                            </div>
                            <div className='w-[600px]'>
                                <EditUser />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default User