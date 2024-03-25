import { PaintType } from '@/app/common'
import React, { useState } from 'react'
import Row from './row'
import { useAppDispatch } from '@/lib/hooks'
import { startedDragging } from '@/lib/features/dragdropSlice'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { adjustPaintsAsync } from '@/lib/features/paintSlice'

const Card = ({ paint }: { paint: PaintType }) => {

    const [isUpdating, setUpdating] = useState(false)
    const [amount, setAmount] = useState<number>(paint.paintQty)

    const dispatch = useAppDispatch()

    const handleStartDragging = () => {
        dispatch(startedDragging(paint))
    }

    const handleUpdate = () => {
        setUpdating(!isUpdating)
        if (isUpdating) {
            dispatch(adjustPaintsAsync({ painterUuid: "", paint, amount }))
        }
    }

    return (
        <div className={`flex-none ring-2 ring-${paint.color === 'white' ? 'slate-500' : paint.color} mt-8 rounded-md cursor-pointer`}
            draggable color={paint.color} onDragStart={handleStartDragging}>
            <div className={`pl-8 bg-${paint.color === 'white' ? 'slate-500' : paint.color} font-bold text-white`}>
                {paint.color.split('-')[0]}
            </div>
            <>{
                isUpdating &&
                <Row className='pl-4'>
                    <div>Quantity: <Input value={amount} type='number' onChange={e => setAmount(parseInt(e.target.value))} /></div>
                </Row>
            }
            </>
            <>{
                !isUpdating &&
                <Row className='pl-4'>
                    {`Quantity: ${paint.paintQty}`}
                </Row>
            }
            </>
            <Row className='pl-4 pb-4'>
                <Button onClick={handleUpdate}>{isUpdating ? 'Update' : 'Save'}</Button>
                <>{
                    isUpdating &&
                    <Button onClick={() => setUpdating(false)}>Cancel</Button>
                }</>
            </Row>
        </div>
    )
}

export default Card