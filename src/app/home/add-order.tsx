import Col from '@/components/col'
import Row from '@/components/row'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { changeFormData, changeShowForm, resetForm, selectFormData, selectShowForm } from '@/lib/features/addOrderSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { DownloadIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { ColorType } from '../common'
import { addOrderedPaintAsync, selectPaints, selectStatus } from '@/lib/features/paintSlice'

const AddOrder = () => {
    const dispatch = useAppDispatch()
    const showForm = useAppSelector(selectShowForm)
    const formData = useAppSelector(selectFormData)
    const status = useAppSelector(selectStatus)
    const paints = useAppSelector(selectPaints)

    useEffect(() => {
        dispatch(resetForm())
    }, [])

    const [errorMessage, setErrorMessage] = useState<string[]>([])

    const handleSubmit = () => {
        setErrorMessage([])
        let message = []
        if (formData.amount <= 0) { message.push('No. of Paint must be more than 0') }
        if (formData.paint === undefined) { message.push('Please select Paint Color') }
        if (message.length > 0) {
            setErrorMessage(message)
            return
        } else {
            dispatch(changeFormData({ createdAt: new Date().toString() }))
            dispatch(addOrderedPaintAsync(formData))
            dispatch(changeFormData({ createdAt: new Date().toString() }))
            if (status === "idle") {
                dispatch(changeShowForm(false))
            }
        }

    }


    if (!showForm) return <></>
    return (
        <>
            <div className='fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-40 strike z-[9000]'>
            </div>
            <div className='z-[9001] w-30 fixed left-[50%] top-[50%] bg-white rounded-md shadow-md p-4 -translate-x-[50%] -translate-y-[50%]'>
                <Row>
                    <div className="text-2xl text-center pb-8">Add New Order</div>
                </Row>
                <Row className='flex justify-center'>
                    <ul className={`text-red-500 pl-8 pr-8 ${errorMessage.length > 0 ? 'pt-2 pb-2 ring-1 rounded-md bg-gray-300' : ''}`}>
                        {errorMessage.map(error => (<li>{error}</li>))}
                    </ul>
                </Row>
                <Row>
                    <Col className='flex-none w-24'><Label htmlFor="username">Color: </Label></Col>
                    <Col className='flex-1 w-64 pl-3'>
                        <Select onValueChange={(value) => dispatch(changeFormData({ paint: paints.filter(p => p.color === value)[0] }))}>
                            <SelectTrigger className={`w-[180px] bg-${formData.paint?.color} ${formData.paint?.color === ColorType.WHITE ? 'text-black' : 'text-white'}`}>
                                <SelectValue placeholder="Select Paint's Color" />
                            </SelectTrigger>
                            <SelectContent className='z-[9002]'>
                                <SelectItem value={ColorType.BLACK} className='bg-black text-white'>Black</SelectItem>
                                <SelectItem value={ColorType.BLUE} className='bg-blue-500 text-white'>Blue</SelectItem>
                                <SelectItem value={ColorType.GREY} className='bg-gray-500 text-white'>Grey</SelectItem>
                                <SelectItem value={ColorType.PURPLE} className='bg-purple-500 text-white'>Purple</SelectItem>
                                <SelectItem value={ColorType.WHITE}>White</SelectItem>
                            </SelectContent>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col className='flex-none w-24'>
                        <Label htmlFor="terms">No. of Paint: </Label></Col>
                    <Col className='flex-1 w-64 pl-3'>
                        <Input type="number" placeholder="No. of Paint" value={formData.amount} onChange={e => dispatch(changeFormData({ amount: parseInt(e.target.value) }))} /></Col>
                </Row>
                <br />
                <Row>
                    <Col className=''>
                        <Button variant="outline" onClick={handleSubmit}>Save <DownloadIcon className="mr-2 h-4 w-4 ml-2" /></Button>
                        <Button variant="link" onClick={() => dispatch(changeShowForm(false))}>Cancel</Button>
                    </Col>
                </Row>
            </div >
        </>

    )
}

export default AddOrder