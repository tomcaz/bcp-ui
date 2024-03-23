import Col from '@/components/col'
import Lane from '@/components/lanes'
import Row from '@/components/row'
import React from 'react'

const HomePage = () => {
    return (
        <div className='flex flex-col items-center'>
            {/* body */}
            <div className="w-[1024px]">
                <Row className="justify-around">
                    <Col>
                        <Lane title="Available" color='bg-teal-500' />
                    </Col>
                    <Col>
                        <Lane title="Running Low" color='bg-amber-500' />
                    </Col>
                    <Col>
                        <Lane title="Out of stock" color="bg-red-500" />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage