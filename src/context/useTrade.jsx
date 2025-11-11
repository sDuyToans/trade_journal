import {createContext, useContext, useState} from "react";
import {recordData} from "../data/fake-records.js";

const TradeContext = createContext(null);

export const TradeProvider = ({ children }) => {
    const [records, setRecords] = useState(recordData);


    return <TradeContext.Provider value={{records, setRecords}}>
        {children}
    </TradeContext.Provider>
}

export const useTrade = () => {
    const { records, setRecords } = useContext(TradeContext);
    return { records, setRecords };
}