export default function PredictHeader() {
    let arr_notes = [
        { id: 1, content: "Market direction is inherently uncertain — all forecasts are estimations, not guarantees." },
        { id: 2, content: "No intraday predictions: price movement within a single day is highly volatile and unpredictable." },
        { id: 3, content: "Daily and monthly forecasts provide smoother trends and are more statistically stable." },
        { id: 4, content: "Use predictions as supplementary insights, not as trading signals or financial advice." },
        { id: 5, content: "Recent market news, economic events, and central bank policies can significantly alter outcomes." },
        { id: 6, content: "Current prediction methods are SMA, EMA, and Linear Regression (if you are trader then you are already know what are EMA and SMA)" }
    ];

    return (
        <div className={"flex flex-col gap-3 justify-center items-center text-black"}>
            <h1 className={"text-xl md:text-3xl lg:text-7xl text-center font-bold"}>Welcome To Prediction Page</h1>
            <div className={"flex flex-col gap-5"}>
                <strong className={"text-3xl font-bold text-center"}>Please be aware of these</strong>
                <ul>
                    {
                        arr_notes.map(c => <li key={c.id} className={"text-xl font-medium"}>{c.id}. {c.content}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}