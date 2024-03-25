import React from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[] | null,
    className?: string,
    flex?: number
}

const Col = ({ children, className, flex = 1 }: Props) => {
    return (
        <div className={`flex-${flex} leading-10 ${className}`}>{children}</div>
    )
}

export default Col