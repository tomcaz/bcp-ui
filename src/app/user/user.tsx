import React from 'react'
import { UserType } from '../common'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import Row from '@/components/row'
import Col from '@/components/col'
import { useAppDispatch } from '@/lib/hooks'
import { act } from 'react-dom/test-utils'
import { editUser, updateStatus } from '@/lib/features/sessionSlice'

const UserItem = ({ user }: { user: UserType }) => {

    const dispatch = useAppDispatch()

    const handleStatusChange = () => {
        dispatch(updateStatus(user.username))
    }

    const handleEdit = () => {
        dispatch(editUser(user))
    }

    return (
        <div className='border-solid border-b-2 border-sky-500'>
            <Row>
                <Col>
                    <div className='mb=1 pl-4'>{user.username.toUpperCase()}</div>
                </Col>
                <Col className='text-right'>
                    <Button onClick={handleEdit}>Edit <ChevronRightIcon /></Button>
                    <Button variant="destructive" onClick={handleStatusChange}>{user.status === 'active' ? 'Disable' : 'Active'}</Button>
                </Col>
            </Row>
        </div>
    )
}

export default UserItem