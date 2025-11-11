import {Button, LinearProgress, TextareaAutosize, TextField} from "@mui/material";
import {useState} from "react";
import {GoArrowDown, GoArrowUp} from "react-icons/go";
import {trade_schema} from "../schema/trade_schema.js";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const TradeInfo = ({ onSave }) => {
    const [type, setType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(trade_schema),
        defaultValues: {amount: "", note: ""}
    })

    const onSubmit = (data) => {

        setIsLoading(true);
        onSave({type, amount: data.amount, note: data.note});
        setIsLoading(false);
        reset();
        setType(null);
    }

    return <div>
        <div className={"flex items-center gap-8"}>
            <Button
                variant="contained"
                color={"success"}
                className={"flex-1 h-13"}
                onClick={() => setType("BUY")}
            >
                <span className={"font-bold text-3xl"}>BUY</span>
            </Button>
            <Button
                variant="contained"
                color={"error"}
                className={"flex-1 h-13"}
                onClick={() => setType("SELL")}
            >
                <span className={"font-bold text-3xl"}>SELL</span>
            </Button>
        </div>

        {
            type && (
                <form className={"mt-10 flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
                    <p className={"text-center font-bold text-lg flex justify-center items-center gap-3"}>
                       <span>
                            You was on a {type}
                       </span>
                        {
                            type === "SELL" ? <GoArrowDown size={20} color={"red"}/> : <GoArrowUp size={20} color={"green"}/>
                        }
                    </p>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            placeholder={"Example: 10, -20,..."}
                            className={"w-full"}
                            {...register('amount')}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                        />
                    </div>
                    <div>
                        <p>Note:</p>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={4}
                            placeholder="Minimum 3 rows"
                            style={{ width: "100%", border: "1px solid gray" }}
                            {...register('note')}
                        />
                        {errors.note && <p className={"text-sm text-red-500"}>{errors.note.message}</p>}
                    </div>
                    {
                        isLoading && <LinearProgress/>
                    }
                    <div className={"w-full flex justify-center"}>
                        <Button type={"submit"} className={"w-1/3"} variant={"contained"}>SUBMIT</Button>
                    </div>
                </form>
            )
        }

    </div>
}

export default TradeInfo;