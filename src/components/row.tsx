import React from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[],
    className?: string
}

const Row = ({ children, className }: Props) => {
    return (
        <div className={`flex ${className}`}>{children}</div>
    )
}

export default Row