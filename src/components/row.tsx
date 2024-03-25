import React, { useState } from 'react'

type Props = {
    children?: string | JSX.Element | JSX.Element[],
    className?: string
}

const Row = ({ children, className }: Props) => {

    const [isDragging, setDragging] = useState(false)

    return (
        <div className={`flex ${className}`}>{children}</div>
    )
}

export default Row