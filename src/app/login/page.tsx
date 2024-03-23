'use client'
import React, { useState } from 'react'
import Row from '@/components/row'
import Col from '@/components/col'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, EnterIcon } from "@radix-ui/react-icons"

const LoginPage = () => {
    const [forgot, isForgot] = useState(false)
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div className='text-2xl font-bold'>British Columbia Painting</div>
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
                        <Row>
                            <Col className='flex-none w-24'><Label htmlFor="username">User Name: </Label></Col>
                            <Col className='flex-1 w-64 pl-3'><Input id="username" type="text" placeholder="username" /></Col>
                        </Row>
                        <Row>
                            <Col className='flex-none w-24'>
                                <Label htmlFor="terms">Password: </Label></Col>
                            <Col className='flex-1 w-64 pl-3'>
                                <Input id="password" type="password" placeholder="Password" /></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className=''>
                                <Button variant="outline">Login <EnterIcon className="mr-2 h-4 w-4 ml-2" /></Button>
                                <Button variant="link" onClick={() => isForgot(!forgot)}>Forgot Password?</Button>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    )
}

export default LoginPage