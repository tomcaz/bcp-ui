'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { DragEventHandler, useState } from 'react'
import Row from './row'
import Col from './col'
import Card from './card'
import { PaintType } from '@/app/common'

type Props = {
    title: string,
    color: string // tailwind colors
    data: PaintType[],
    isRTPU?: boolean
}

const Lane = ({ title, color, data, isRTPU = false }: Props) => {
    const [dropping, isDropping] = useState(false)

    const onDropping = (event: any) => {
        console.log(event.target.parent)
        isDropping(true)
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
                        <PlusIcon className="mr-2 h-4 w-4 ml-2 text-white" />
                    </Col>
                }</>
            </Row>
            <Row className='flex-col justify-start h-[600px] pl-4 pr-4'>
                <div className='h-max' onDragOver={onDropping}>
                    {data.length > 0 &&
                        data.map((paint, index) => (
                            <Card key={index} paint={paint} />
                        ))
                    }</div>
            </Row>
        </div>
    )
}

export default Lane