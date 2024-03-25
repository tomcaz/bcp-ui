"use client"
import Col from '@/components/col'
import Lane from '@/components/lanes'
import Row from '@/components/row'
import { ColorType, PaintType, LaneType } from '../common'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { loadOrderedPaintAsync, loadPaintAsync, selectOrderedPaints, selectPaints } from '@/lib/features/paintSlice'
import { useEffect } from 'react'
import AddOrder from './add-order'

const HomePage = () => {

    const dispatch = useAppDispatch();
    const paints = useAppSelector(selectPaints);
    const orderedPaints = useAppSelector(selectOrderedPaints);

    useEffect(() => {
        dispatch(loadPaintAsync([]));
        dispatch(loadOrderedPaintAsync([]));
    }, [])

    return (
        <div className='flex flex-col items-center'>
            {/* body */}
            <div className="w-[1024px]">
                <Row className="justify-around">
                    <Col>
                        <Lane title="Available" color='teal-500' lane={LaneType.available} data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.available)} />
                    </Col>
                    <Col>
                        <Lane title="Running Low" color='amber-500' lane={LaneType.runningLow} data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.runningLow)} />
                    </Col>
                    <Col>
                        <Lane title="Out of stock" color="red-500" lane={LaneType.outOfStock} data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.outOfStock)} />
                    </Col>
                    <Col>
                        <Lane title="Ready to Pickup" color="slate-500" lane={LaneType.readyToPickup} data={orderedPaints} isRTPU={true} />
                    </Col>
                </Row>
            </div>
            <AddOrder />
        </div>
    )
}

export default HomePage