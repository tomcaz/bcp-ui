"use client"
import Col from '@/components/col'
import Lane from '@/components/lanes'
import Row from '@/components/row'
import { ColorType, PaintType, LaneType } from '../common'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { loadPaintAsync, selectOrderedPaints, selectPaints } from '@/lib/features/paintSlice'
import { useEffect } from 'react'

const HomePage = () => {

    const dispatch = useAppDispatch();
    const paints = useAppSelector(selectPaints);
    const orderedPaints = useAppSelector(selectOrderedPaints);

    useEffect(()=>{
        console.log(paints)
        dispatch(loadPaintAsync([]));
        console.log(paints)
    },[])
    
    
    // const [data, setData] = useState<PaintType[]>(rawData)
    // const [draggingPaint, setDraggingPaint] = useState<PaintType | null>()

    // will be continue after state management install and setup

    // const handleDrop = (lane: LaneType) => {
    //     console.log(draggingPaint, lane)
    // }

    // const handleDragging = (paint: PaintType) => {
    //     setDraggingPaint(paint)
    // }

    // const handleDragCancle = () => {
    //     setDraggingPaint(null)
    // }

    return (
        <div className='flex flex-col items-center'>
            {/* body */}
            <div className="w-[1024px]">
                <Row className="justify-around">
                    <Col>
                        <Lane title="Available" color='teal-500' data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.available)} />
                    </Col>
                    <Col>
                        <Lane title="Running Low" color='amber-500' data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.runningLow)} />
                    </Col>
                    <Col>
                        <Lane title="Out of stock" color="red-500" data={
                            paints.filter((paint: PaintType) =>
                                paint.lane === LaneType.outOfStock)} />
                    </Col>
                    <Col>
                        <Lane title="Ready to Pickup" color="slate-500" data={[]} isRTPU={true} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage