import Col from '@/components/col'
import Row from '@/components/row'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cancelEditUser, selectEditingUser, updateRole } from '@/lib/features/sessionSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { UserType } from '../common'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'

const EditUser = () => {

    const dispatch = useAppDispatch()
    const editingUser = useAppSelector(selectEditingUser)

    const [username, setUsername] = useState<string>()
    const [role, setRole] = useState<string>()
    // const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState([])

    useEffect(() => {
        if (editingUser) {
            setUsername(editingUser.username)
            setRole(editingUser.role)
        }
    }, [editingUser])

    const handleSubmit = () => {
        dispatch(updateRole({ username, role }))
    }

    if (!editingUser)
        return <></>
    return (
        <>
            <div className='ml-4 rounded-md shadow-md p-4 ring-1 ring-slate-200'>
                <Row>
                    <div className="text-2xl text-center pb-8">Update User</div>
                </Row>
                <Row className='flex justify-center'>
                    <ul className={`text-red-500 pl-8 pr-8 ${errorMessage.length > 0 ? 'pt-2 pb-2 ring-1 rounded-md bg-gray-300' : ''}`}>
                        {errorMessage.map(error => (<li>{error}</li>))}
                    </ul>
                </Row>
                <Row>
                    <Col className='flex-none w-24'>
                        <Label htmlFor="terms">User Name: </Label></Col>
                    <div className='flex-1 w-64 pl-3'>
                        {editingUser.username} </div>
                </Row>
                {/* <Row>
                    <Col className='flex-none w-24'>
                        <Label htmlFor="terms">Password: </Label></Col>
                    <Col className='flex-1 w-64 pl-3'>
                        <Input type="password" placeholder="Password" value={password}
                            onChange={e => setPassword(e.target.value)} /></Col>
                </Row> */}
                <Row>
                    <Col className='flex-none w-24'><Label htmlFor="username">Role: </Label></Col>
                    <Col className='flex-1 w-64 pl-3'>
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select User's Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'admin'}>Admin</SelectItem>
                                <SelectItem value={'manager'}>Manager</SelectItem>
                                <SelectItem value={'painter'}>Painter</SelectItem>
                            </SelectContent>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col className=''>
                        <Button variant="outline" onClick={handleSubmit}>Save <DownloadIcon className="mr-2 h-4 w-4 ml-2" /></Button>
                        <Button variant="link" onClick={() => dispatch(cancelEditUser())}>Cancel</Button>
                    </Col>
                </Row>
            </div >
        </>

    )
}

export default EditUser