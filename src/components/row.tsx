import React from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const Row = ({ children }: Props) => {
    return (
        <div className='display: flex'>{children}</div>
    )
}

export default Row