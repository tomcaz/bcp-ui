'use client'
import Col from '@/components/col'
import Lane from '@/components/lanes'
import Row from '@/components/row'
import React, { useState } from 'react'
import { ColorType, PaintType, LaneType } from '../common'

const rawData: PaintType[] = [
    { color: ColorType.WHITE, paintQty: 200, lane: LaneType.available },
    { color: ColorType.BLUE, paintQty: 50, lane: LaneType.runningLow },
    { color: ColorType.GREY, paintQty: 10, lane: LaneType.runningLow },
    { color: ColorType.PURPLE, paintQty: 300, lane: LaneType.available },
    { color: ColorType.BLACK, paintQty: 250, lane: LaneType.available }
]

const HomePage = () => {

    const [data, setData] = useState<PaintType[]>(rawData)
    const [draggingPaint, setDraggingPaint] = useState<PaintType | null>()

    // will be continue after state management install and setup

    const handleDrop = (lane: LaneType) => {
        console.log(draggingPaint, lane)
    }

    const handleDragging = (paint: PaintType) => {
        setDraggingPaint(paint)
    }

    const handleDragCancle = () => {
        setDraggingPaint(null)
    }

    return (
        <div className='flex flex-col items-center'>
            {/* body */}
            <div className="w-[1600px]">
                <Row className="justify-around">
                    <Col>
                        <Lane title="Available" color='teal-500' data={
                            data.filter((paint: PaintType) =>
                                paint.lane === LaneType.available)} />
                    </Col>
                    <Col>
                        <Lane title="Running Low" color='amber-500' data={
                            data.filter((paint: PaintType) =>
                                paint.lane === LaneType.runningLow)} />
                    </Col>
                    <Col>
                        <Lane title="Out of stock" color="red-500" data={
                            data.filter((paint: PaintType) =>
                                paint.lane === LaneType.outOfStock)} />
                    </Col>
                    <Col>
                        <Lane title="Ready to Pickup" color="red-500" data={[]} isRTPU={true} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage