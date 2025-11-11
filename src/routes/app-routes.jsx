import React from 'react'
import {Route, Routes} from "react-router";
import Home from "../pages/home/Home.jsx";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Features from "../pages/features/Features.jsx";
import Calendar from "../pages/features/calendar/Calendar.js";
import News from "../pages/features/news/News.js";
import Price from "../pages/price/Price.jsx";
import Payment from "../pages/payment/Payment.jsx";
import Predict from "../pages/predict/Predict.jsx";
import ChartPage from "../pages/chart/ChartPage.jsx";
import LiveChartPage from "../pages/chart/LiveChartPage.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/*home page*/}
            <Route index path={"/"} element={<Home/>}/>

            {/*auth*/}
            <Route path={"auth"} element={<AuthLayout/>}/>
            {/*chill elements*/}
            <Route path={"login"} element={<Login/>}/>
            <Route path={"register"} element={<Register/>}/>

            {/*features*/}
            <Route path={"/features"} element={<Features/>}/>

            {/*calendar*/}
            <Route path={"/calendar"} element={<Calendar/>}/>
            {/*news*/}
            <Route path={"/news"} element={<News/>}/>

            {/*pricing*/}
            <Route path={"/price"} element={<Price/>}/>

            {/*payment*/}
            <Route path={"/payment"} element={<Payment/>}/>

            {/*Predict*/}
            <Route path={"/predict"} element={<Predict/>}/>

            {/*Chart*/}
            <Route path={"/chart"} element={<ChartPage/>}/>

            {/*Live Chart Trading View*/}
            <Route path={"/live-chart"} element={<LiveChartPage/>}/>
        </Routes>
    )
}
