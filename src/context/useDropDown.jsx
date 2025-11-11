import {createContext, useContext, useState} from "react";

const DropDownContext = createContext();

export const DropDownProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return <DropDownContext.Provider value={{ open, setOpen }}>
        {children}
    </DropDownContext.Provider>
}

export const useDropDown = () => {
    const { open, setOpen } = useContext(DropDownContext);
    return { open, setOpen };
}