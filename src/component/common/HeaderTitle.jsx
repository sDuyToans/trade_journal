import React from 'react'

export default function HeaderTitle({text}) {
    return (
        <div className={"w-full my-8 z-100"}>
            <h1 className={"font-bold text-3xl md:text-5xl lg:text-7xl text-center"}>{text}</h1>
        </div>
    )
}
