import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import { createChart, LineSeries, BaselineSeries } from "lightweight-charts";
import { useGetBaseLineQuery, useGetPredictQuery } from "../../api/forexApi.js";
import { CircularProgress } from "@mui/material";

export default function ChartPage({ from = "EUR", to = "USD", model = "SMA" }) {
    const { data = [], isLoading, isFetching, error } =
        useGetBaseLineQuery({ fromPair: from, toPair: to });

    const { data: predictionResponse = {}, isLoading: predLoading, isFetching: predFetching } =
        useGetPredictQuery({ fromPair: from, toPair: to, model, window: 20, days: 30 });

    const [chartReady, setChartReady] = useState(false);
    const chartContainerRef = useRef(null);

    const predictionData = (predictionResponse?.predictions ?? [])
        .map(p => {
            if (!p?.date) return null;
            const parsed = new Date(p.date.replace(/-/g, '/'));
            const epoch = Math.floor(parsed.getTime() / 1000);
            return {
                time: isNaN(epoch) ? null : epoch,
                value: Number(p.predictClose),
            };
        })
        .filter(p => p && p.time !== null && !isNaN(p.value));

    // Create chart once data ready
    useEffect(() => {
        if (!data.length || !chartContainerRef.current) return;

        // Create chart
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                background: { color: "white", type: "solid" },
                text: "#000"
            },
            grid: {
                vertLines: { color: "#e1e3eb" },
                horzLines: { color: "#e1e3eb" }
            },
            timeScale: {
                borderColor: "#D1D4DC",
                timeVisible: true,
                secondsVisible: false
            }
        });

        const actualPrices = chart.addSeries(BaselineSeries, {
            baseValue: { type: "price", price: data[data.length - 1]?.value ?? 0 },
            topLineColor: "rgba(38, 166, 154, 1)",
            topFillColor1: "rgba(38, 166, 154, 0.28)",
            topFillColor2: "rgba(38, 166, 154, 0.05)",
            bottomLineColor: "rgba(239, 83, 80, 1)",
            bottomFillColor1: "rgba(239, 83, 80, 0.05)",
            bottomFillColor2: "rgba(239, 83, 80, 0.28)",
            lineWidth: 2,
        });
        actualPrices.setData(data);

        // Add predicted series
        if (predictionData.length > 0) {
            const lastActualTime = data[data.length - 1]?.time;
            if (lastActualTime && !isNaN(lastActualTime)) {
                const predictSeries = chart.addSeries(LineSeries, {
                    color: "rgba(255, 165, 0, 1)",
                    lineWidth: 2,
                    lineStyle: 0, // dashed
                });

                const shiftedPrediction = predictionData
                    .map((p, i) => ({
                        ...p,
                        time: lastActualTime + (i + 1) * 86400,
                    }))
                    .filter(p => !isNaN(p.time))
                    .sort((a, b) => a.time - b.time);

                predictSeries.setData(shiftedPrediction);
            }
        }

        chart.timeScale().fitContent();
        setChartReady(true); // ✅ mark chart as ready

        const handleResize = () =>
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [data, predictionData]);

    const stillLoading =
        isLoading || isFetching || predLoading || predFetching || !chartReady;

    if (error) {
        return (
            <DefaultLayout>
                <div className="text-3xl md:text-5xl lg:text-7xl text-black text-center">
                    Error loading data: {error.status}
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="relative w-full h-[600px] bg-white shadow-md" ref={chartContainerRef}>
                {stillLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                        <CircularProgress />
                        <p className="mt-4 text-gray-600 text-sm">
                            Loading chart for {from}/{to} ({model})...
                        </p>
                    </div>
                )}

                {/* Chart legend overlay */}
                {chartReady && (
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "30px",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "8px",
                            padding: "6px 10px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            fontSize: "0.875rem",
                        }}
                    >
                        <div className="flex items-center mb-1">
                            <div className="w-4 h-1.5 bg-teal-500 mr-2 rounded"></div>
                            <div className="w-4 h-1.5 bg-red-500 mr-2 rounded"></div>
                            <span>Historical Data</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-1.5 bg-orange-500 mr-2 rounded border-dashed border border-orange-400"></div>
                            <span>Predicted Trend</span>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}