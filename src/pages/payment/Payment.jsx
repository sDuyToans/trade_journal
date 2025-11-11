import React from 'react'
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import {usePrice} from "../../context/usePrice.jsx";
import {CiUser} from "react-icons/ci";
import {Button, TextField} from "@mui/material";

export default function Payment() {
    const {tiers} = usePrice();
    return (
        <DefaultLayout dH={"w-full h-full"}>
            <div className={"w-full h-full relative z-10 overflow-hidden"}>
                <StripeCheckout/>
                <div
                    className={"w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-transparent border-1 border-white absolute -top-30 -left-30 md:-top-50 md:-left-50 lg:-top-[30%] lg:-left-[15%] rounded-full z-20"}/>
                <div
                    className={"w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-transparent border-1 border-white absolute -top-30 -right-30 md:-top-50 md:-right-50 lg:-top-[30%] lg:-right-[15%] rounded-full z-20"}/>
                <div
                    className={"w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-transparent border-1 border-white absolute -bottom-30 -left-30 md:-bottom-50 md:-left-50 lg:-bottom-[30%] lg:-left-[15%] rounded-full z-20"}/>
                <div
                    className={"w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-transparent border-1 border-white absolute -bottom-30 -right-30 md:-bottom-50 md:-right-50 lg:-bottom-[30%] lg:-right-[15%] rounded-full z-20"}/>
            </div>
        </DefaultLayout>
    )
}

const StripeCheckout = () => {
    return <div className={"w-full h-full bg-[#3C93FF]"}>
        <h1 className={"text-center text-3xl md:text-5xl lg:text-7xl font-bold"}>stripe</h1>
        <div className={"flex flex-col lg:flex-row items-start mx-auto max-w-[900px] gap-8 h-full mt-3 rounded-2xl border border-[#E7EAEB] bg-[#54A0FF]"}>
            <div className={"w-full lg:w-1/3 p-[50px]"}>
                <div className={"flex items-center gap-3"}>
                    <CiUser/>
                    <p class={"font-semibold text-2xl"}>John Dee</p>
                </div>
                <div className={"py-[32px]"}>
                    <p className={"font-bold text-xl"}>Subscription fee</p>
                    <div className={"flex items-center gap-3"}>
                        <span className={"text-5xl font-bold"}>$96.00</span>
                        <span>Per month</span>
                    </div>
                </div>
                <div className={"border-b-2 border-gray-200 pb-5"}>
                    <div className={"flex items-center justify-between"}>
                        <p>Platform basic</p>
                        <p>$96.00</p>
                    </div>
                    <p className={"text-gray-300"}>Billed monthly</p>
                </div>
                <div className={"border-b-2 border-gray-200 py-5"}>
                    <div className={"flex items-center justify-between"}>
                        <p>Subtotal</p>
                        <p>$96.00</p>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <p>Tax</p>
                        <p>$96.00</p>
                    </div>
                </div>
                <div className={"py-5"}>
                    <div className={"flex items-center justify-between"}>
                        <p>Subtotal</p>
                        <p>$96.00</p>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <p>Total due today</p>
                        <p>$96.00</p>
                    </div>
                </div>
            </div>
            <div className={"w-full lg:w-2/3 bg-white h-full flex flex-col gap-6 p-10"}>
                <div className={"flex flex-col gap-3"}>
                    <p className={"text-black text-2xl"}>Contact information</p>
                    <div>
                        <TextField id="outlined-basic" label="Email" variant="outlined" className={"w-full"}/>
                    </div>
                </div>
                <div className={"flex flex-col gap-3"}>
                    <p className={"text-black text-2xl"}>Payment method</p>
                    <div className={"flex flex-col gap-3"}>
                        <p>Card information</p>
                        <TextField id="outlined-basic" label="Card Number" variant="outlined" className={"w-full"}/>
                        <div className={"flex items-center gap-3"}>
                            <TextField id="outlined-basic" label="MM/YY" variant="outlined" className={"w-full"}/>
                            <TextField id="outlined-basic" label="CVC" variant="outlined" className={"w-full"}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        <p className={"text-black"}>Cardholder name</p>
                        <TextField id="outlined-basic" label="Full name on card" variant="outlined" className={"w-full"}/>
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        <p className={"text-black"}>Billing Address</p>
                        <TextField id="outlined-basic" label="Address line 1" variant="outlined" className={"w-full"}/>
                        <TextField id="outlined-basic" label="Address line 2" variant="outlined" className={"w-full"}/>
                        <TextField id="outlined-basic" label="City" variant="outlined" className={"w-full"}/>
                        <TextField id="outlined-basic" label="State" variant="outlined" className={"w-full"}/>
                        <TextField id="outlined-basic" label="Postal code" variant="outlined" className={"w-full"}/>
                    </div>
                </div>
                <Button variant="contained">Subscribe</Button>
            </div>
        </div>
    </div>
}
