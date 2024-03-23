import React from 'react'

type Props = {
    title: string,
    color?: string // tailwind colors
}

const Lane = ({ title, color }: Props) => {
    return (
        <div className={`${color}`}>
            <div className='leading-l'>
                {title}
            </div>
        </div>
    )
}

export default Lane