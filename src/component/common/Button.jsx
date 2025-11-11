import React from 'react'

export default function Button({ children, type ="button" }) {
    return (
        <button className={"text-black border border-gray-500 h-[50px] w-[150px] md:w-[200px] lg:w-[300px] cursor-pointer hover:bg-gray-300"} type={type}>
            {children}
        </button>
    )
}
