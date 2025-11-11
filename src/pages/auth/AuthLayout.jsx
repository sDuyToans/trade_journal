import React from 'react'
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import HeaderTitle from "../../component/common/HeaderTitle.jsx";
import AuthSelection from "../../component/AuthSelection.jsx";
import transition from "../../transition.jsx";

const AuthLayout = () => {
    return (
        <DefaultLayout>
            <HeaderTitle text={"Welcome Back"}/>
            <AuthSelection/>
        </DefaultLayout>
    )
}

export default transition(AuthLayout);
