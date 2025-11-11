import React, {useEffect, useState} from 'react'
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import {Autocomplete, TextField} from "@mui/material";

const pairs = [
    "EUR/USD",
    "USD/JPY",
    "GBP/USD",
    "USD/CHF",
    "USD/CAD",
    "AUD/USD",
    "NZD/USD",
];

export default function LiveChartPage() {
    const [pair, setPair] = useState("EUR/USD")


    useEffect(() => {
        const chartContainer = document.getElementById("tradingview_chart");
        if (!chartContainer) return;
        chartContainer.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            // format pair for TradingView syntax: FX: EURUSD
            const formatted = `FX:${pair.replace("/", "")}`;

            new window.TradingView.widget({
                width: "100%",
                height: 500,
                symbol: formatted,
                interval: "15",
                timezone: "Etc/UTC",
                theme: "light",
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                hide_side_toolbar: false,
                allow_symbol_change: false,
                // autosize: true,
                // autosave: true,
                container_id: "tradingview_chart"
            })
        };
        document.body.appendChild(script);
    }, [pair]);



    return (
        <DefaultLayout>
            <div className={"flex flex-col gap-3 bg-white text-black p-3 rounded-xl shadow-md"}>
                <LiveChartHeader/>

                <Autocomplete
                    value={pair}
                    onChange={(event, newPair) => setPair(newPair)}
                    options={pairs}
                    sx={{width: 300, marginBottom: "20px"}}
                    className={"absolute"}
                    renderInput={(params) => (
                        <TextField {...params} label={"Select Pair"} variant={"outlined"}/>
                    )}
                />

                <div id={"tradingview_chart"} className={"w-full"}/>
            </div>
        </DefaultLayout>
    )
}


function LiveChartHeader() {
    return <h1 className={"text-3xl md:text-5xl lg:text-7xl font-bold text-center"}>Live Chart</h1>
}