import React from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[],
    className?: string
}

const Col = ({ children, className }: Props) => {
    return (
        <div className={`flex-1 leading-10 ${className}`}>{children}</div>
    )
}

export default Col