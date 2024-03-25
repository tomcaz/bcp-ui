import { PaintType } from '@/app/common'
import React from 'react'
import Row from './row'
import { useAppDispatch } from '@/lib/hooks'
import { startedDragging } from '@/lib/features/dragdropSlice'

const Card = ({ paint }: { paint: PaintType }) => {

    const dispatch = useAppDispatch()

    const handleStartDragging = () => {
        dispatch(startedDragging(paint))
    }

    return (
        <div className={`flex-none ring-2 ring-${paint.color === 'white' ? 'slate-500' : paint.color} mt-8 rounded-md cursor-pointer`}
            draggable color={paint.color} onDragStart={handleStartDragging}>
            <div className={`pl-8 bg-${paint.color === 'white' ? 'slate-500' : paint.color} font-bold text-white`}>
                {paint.color.split('-')[0]}
            </div>
            <Row className='pl-4'>
                {`Quantity: ${paint.paintQty}`}
            </Row>
        </div>
    )
}

export default Card