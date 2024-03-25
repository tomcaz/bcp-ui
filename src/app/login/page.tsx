'use client'
import React, { useState } from 'react'
import Row from '@/components/row'
import Col from '@/components/col'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, EnterIcon } from "@radix-ui/react-icons"
import { useAppDispatch } from '@/lib/hooks'
import { loginSession } from '@/lib/features/sessionSlice'
import { authenticate } from '../lib/actions/authenticate'
import { handleLoginAction } from '../actions'

const LoginPage = () => {
    const [forgot, isForgot] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [loginData, setLoginData] = useState<{ username: string, password: string }>({ username: '', password: '' })
    const dispatch = useAppDispatch()
    const handleLogin = async () => {
        try {
            const data = await authenticate(loginData)
            dispatch(loginSession(data))
            await handleLoginAction(data)
        } catch (error) {
            setErrorMessage('Invalid username or password')
        }

    }
    return (
        <div className='flex flex-col h-screen items-center'>
            {
                forgot === true ?
                    <div className='ring-1 ring-slate-200 rounded-md mt-10'>
                        <Button variant="link"><ArrowLeftIcon className="mr-2 h-4 w-4 mt-6" onClick={() => isForgot(!forgot)} /></Button>
                        <br />
                        <br />
                        <div className='text-l font-bold pl-12 pr-12 pb-12'>!!! Please contact to administrator (Adam)</div>
                    </div>
                    :
                    <div className='ring-1 ring-slate-200 p-10 mt-10 rounded-md'>
                        <form action={handleLogin}>
                            <>{errorMessage &&
                                <Row>
                                    <div className="text-l text-red-500 pb-4 text-center">{errorMessage}</div>
                                </Row>}</>
                            <Row>
                                <Col className='flex-none w-24'><Label htmlFor="username">User Name: </Label></Col>
                                <Col className='flex-1 w-64 pl-3'><Input type="text" placeholder="username"
                                    onChange={e => setLoginData({ ...loginData, username: e.target.value })} /></Col>
                            </Row>
                            <Row>
                                <Col className='flex-none w-24'>
                                    <Label htmlFor="terms">Password: </Label></Col>
                                <Col className='flex-1 w-64 pl-3'>
                                    <Input type="password" placeholder="Password"
                                        onChange={e => setLoginData({ ...loginData, password: e.target.value })} /></Col>
                            </Row>
                            <br />
                            <Row>
                                <Col className=''>
                                    <Button variant="outline">Login <EnterIcon className="mr-2 h-4 w-4 ml-2" /></Button>
                                    <Button variant="link" type='button' onClick={() => isForgot(!forgot)}>Forgot Password?</Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
            }
        </div>
    )
}

export default LoginPage