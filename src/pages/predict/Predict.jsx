import React, {useState} from 'react'
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import PredictHeader from "../../component/PredictHeader.jsx";
import {
    Autocomplete,
    Button, FormControl, InputLabel, MenuItem, Select,
    TextField,
} from "@mui/material";
import ModalPrediction from "../../component/ModalPrediction.jsx";


export default function Predict() {
    const [pair, setPair] = useState("");
    const [open, setOpen] = React.useState(false);
    const [model, setModel] = useState("");

    return (
        <DefaultLayout dH={"h-dvh"}>
            <div className={"w-full bg-white h-full p-8"}>
                <PredictHeader/>
                <SearchPairBar onSelectPair={setPair} setOpen={setOpen} setModel={setModel} model={model}/>
                <ModalPrediction pair={pair} setOpen={setOpen} open={open} model={model}/>
            </div>
        </DefaultLayout>
    )
}

function SearchPairBar({onSelectPair, setOpen, setModel, model}) {


    const FOREX_PAIRS = [
        "EUR/USD",
        "USD/JPY",
        "GBP/USD",
        "AUD/USD",
        "USD/CAD",
        "USD/CHF",
        "NZD/USD",
        "EUR/JPY",
        "GBP/JPY",
        "EUR/GBP",
        "USD/CNY"
    ];

    const MODELS = [
        "EMA", "SMA", "LINEAR_REGRESSION"
    ];
    return (
        <div className={"flex flex-col gap-8 items-center justify-center bg-white text-black p-8"}>
            <h3 className={"text-xl md:text-3xl lg:text-5xl"}>Search Forex Pairs</h3>

            <Autocomplete
                disablePortal
                options={FOREX_PAIRS}
                sx={{width: "60%"}}
                onChange={(event, value) => onSelectPair && onSelectPair(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Enter pair name, example: USD/EUR, ..."}
                        variant={"outlined"}
                    />
                )}
            />
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full md:w-3/4">
                <FormControl sx={{ minWidth: 200 }} variant="outlined">
                    <InputLabel id="model-select-label">Model</InputLabel>
                    <Select
                        labelId="model-select-label"
                        value={model}
                        label="Model"
                        onChange={(e) => setModel(e.target.value)}
                    >
                        {MODELS.map((m) => (
                            <MenuItem key={m} value={m}>
                                {m.replace("_", " ")}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{height: "56px", px: 4}}
                    onClick={() => setOpen(true)}
                    disabled={!onSelectPair}
                >
                    Predict
                </Button>
            </div>
        </div>
    )
}


