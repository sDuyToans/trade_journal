import React from 'react'
import NavBar from "../component/NavBar.jsx";
import Footer from "../component/Footer.jsx";

export default function DefaultLayout({children, defaultbg = "bg-red-200", dH = "h-dvh"}) {
    return (
        <main className={`flex flex-col justify-between gap-2 p-3 w-full mx-auto relative ${defaultbg} ${dH}`}>
            <NavBar/>
            {children}
            <Footer/>
        </main>
    )
}
