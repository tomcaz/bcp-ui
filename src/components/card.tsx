import { PaintType } from '@/app/common'
import React from 'react'
import Row from './row'

const Card = ({ paint }: { paint: PaintType }) => {
    return (
        <div className={`flex-none ring-2 ring-${paint.color} mt-8 rounded-md cursor-pointer`} draggable color={paint.color}>
            <div className={`pl-8 bg-${paint.color} font-bold text-${paint.color === 'white' ? 'black' : 'white'}`}>
                {paint.color.split('-')[0]}
            </div>
            <Row className='pl-4'>
                {`Quantity: ${paint.paintQty}`}
            </Row>
        </div>
    )
}

export default Card