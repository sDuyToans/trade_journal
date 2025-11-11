import {createContext, useContext, useEffect, useState} from "react";
import {useValidateTokenQuery} from "../api/authApi.js";
import {useDispatch} from "react-redux";
import {tradeApi} from "../api/tradeApi.js";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const { data, isLoading, refetch } = useValidateTokenQuery();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();

    // Automatically sync with backend validation
    useEffect(() => {
        if (!isLoading){
            if (data?.valid){
                setIsLoggedIn(true);
                setUserData(data);
            } else {
                setIsLoggedIn(false);
                setUserData(null);
            }
        }
    }, [data, isLoading]);


    // log out client
    const logoutClient = () => {
        setIsLoggedIn(false);
        setUserData(null);
        // dispatch(tradeApi.util.resetApiState());
        // dispatch(tradeApi.util.resetApiState());
    }

    return <AuthContext.Provider value={{isLoggedIn, isLoading, setIsLoggedIn, data: userData, setUserData, refetchAuth: refetch, logoutClient}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const {isLoggedIn, isLoading, data, setUserData, refetchAuth, setIsLoggedIn, logoutClient} = useContext(AuthContext);
    return {isLoggedIn, isLoading, data, setUserData, refetchAuth, setIsLoggedIn, logoutClient}
}