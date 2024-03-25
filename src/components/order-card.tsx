import { ColorType, OrderStatus, OrderType, PaintType } from '@/app/common'
import React from 'react'
import Row from './row'
import { useAppDispatch } from '@/lib/hooks'
import { Button } from './ui/button'
import { loadPaintAsync, pickupPaintAsync } from '@/lib/features/paintSlice'

const OrderCard = ({ order }: { order: OrderType }) => {

    const dispatch = useAppDispatch()
    const handlePickup = () => {
        dispatch(pickupPaintAsync({ order: order.id as string, status: OrderStatus.PICK_UP }))
    }

    return (
        <div className={`flex-none w-56 ring-2 ring-${order.paint?.color === ColorType.WHITE ? 'slate-500' : order.paint?.color} mt-8 rounded-md cursor-pointer`}
            color={order.paint?.color}>
            <div className={`pl-8 bg-${order.paint?.color === 'white' ? 'slate-500' : order.paint?.color} font-bold text-white`}>
                {order.paint?.color.split('-')[0]}
            </div>
            <Row className='pl-4'>
                {`Quantity: ${order.amount}`}
            </Row>
            <Row className='pl-4 break-words'>
                {`Address: ${order.address}`}
            </Row>
            <Row className='pl-4 pb-4'>
                <Button onClick={handlePickup}>Picked Up</Button>
            </Row>
        </div>
    )
}

export default OrderCard