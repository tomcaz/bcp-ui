'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { DragEventHandler, useState } from 'react'
import Row from './row'
import Col from './col'
import Card from './card'
import { LaneType, OrderType, PaintType } from '@/app/common'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectCurrentDraggingPaint } from '@/lib/features/dragdropSlice'
import { changeLaneAsync } from '@/lib/features/paintSlice'
import { changeShowForm } from '@/lib/features/addOrderSlice'
import OrderCard from './order-card'

type Props = {
    title: string,
    color: string // tailwind colors
    data: PaintType[] | OrderType[],
    isRTPU?: boolean,
    lane: LaneType
}

const Lane = ({ title, color, data, isRTPU = false, lane }: Props) => {
    const [isDragging, setDragging] = useState(false)

    const droppedPaint = useAppSelector(selectCurrentDraggingPaint)
    const dispatch = useAppDispatch()

    const handleDrop = (event: any) => {
        event.preventDefault()
        dispatch(changeLaneAsync({
            lane, paint: droppedPaint!
        }))
        setDragging(false)
    }

    const handleDrag = (e: any) => {
        if (lane !== LaneType.readyToPickup)
            e.preventDefault();
        setDragging(true)
    }

    return (
        <div className={`ml-8 mr-8 ring-2 ring-${color} rounded-md`}>
            <Row>
                <Col>
                    <div className={`bg-${color} leading-l text-center font-bold text-white`}>
                        {title}
                    </div>
                </Col>
                <>{
                    isRTPU &&
                    <Col className={`bg-${color} flex-none pt-3 cursor-pointer`}>
                        <PlusIcon className="mr-2 h-4 w-4 ml-2 text-white" onClick={() => dispatch(changeShowForm(true))} />
                    </Col>
                }</>
            </Row>
            <>
                {!isRTPU &&
                    <Row className={`flex-col justify-start h-[600px] pl-4 pr-4 ${isDragging ? (lane === LaneType.readyToPickup ? 'bg-red-200' : 'bg-blue-200') : ''}`}>
                        <div className='h-full' onDrop={handleDrop} onDragOver={handleDrag} onDragEnd={() => setDragging(false)} onDragLeave={() => setDragging(false)}>
                            {data.length > 0 &&
                                data.map((paint, index) => (
                                    <Card key={index} paint={paint as PaintType} />
                                ))
                            }</div>
                    </Row>
                }
            </>
            <>
                {isRTPU &&
                    <Row className={`flex-col justify-start h-[600px] pl-4 pr-4 ${isDragging ? (lane === LaneType.readyToPickup ? 'bg-red-200' : 'bg-blue-200') : ''}`}>
                        <div className='h-full overflow-y-auto' onDragOver={handleDrag} onDragEnd={() => setDragging(false)} onDragLeave={() => setDragging(false)}>
                            {data.length > 0 &&
                                data.map((order, index) => (
                                    <OrderCard key={index} order={order as OrderType} />
                                ))
                            }</div>
                    </Row>
                }
            </>
        </div>
    )
}

export default Lane