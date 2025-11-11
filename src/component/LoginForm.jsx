import Button from "./common/Button.jsx";
import {Link} from "react-router/internal/react-server-client";
import React, {useState} from "react";
import {motion} from "motion/react";
import {IoIosArrowRoundBack} from "react-icons/io";
import {useLoginMutation, useVerifyGoogleTokenMutation} from "../api/authApi.js";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {Alert, Snackbar, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {login_schema} from "../schema/login_schema.js";
import {yupResolver} from "@hookform/resolvers/yup";

const wordVariants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

export default function LoginForm() {
    const [loginGoogle] = useVerifyGoogleTokenMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}} = useForm({ resolver: yupResolver(login_schema)});

    const [login, {isLoading}] = useLoginMutation();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSuccess = async (credentialResponse) => {
        const googleToken = credentialResponse.credential;

        try {
            await loginGoogle(googleToken);
            setMessage( "Login Successfully!");
            setTimeout(() => (window.location.href = "/"), 1000);
        } catch(e) {
            alert("Google login failed!");
        }
    }

    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap();

            if (res.message) {
                setMessage(res.message || "Login Successfully!");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
        } catch (e){
            setError(e?.data?.message || "Invalid email or password");
        }
    }

    return <div className={"w-full justify-center h-full items-center mt-5 md:mt-20"}>
        <div className={"flex flex-col md:flex-row max-w-[900px] h-[70%] bg-white mx-auto shadow-2xl justify-between"}>
            <img src={"/images/loginimg.avif"} alt={"img_login"} className={"flex-1 h-full"}/>
            <div
                className={"text-black flex flex-col justify-center items-center gap-3 md:gap-6 bg-amber-50 flex-1 p-3 relative"}>
                <motion.div className={"absolute -bottom-8 right-3 md:right-3 md:bottom-3"} variants={wordVariants}
                            animate={"animate"}>
                    <Link to={"/"} className={"flex gap-2 items-center self-end"}>
                        <IoIosArrowRoundBack size={20}/>
                        <span>Go back home</span>
                    </Link>
                </motion.div>
                <h2 className={"font-bold text-2xl"}>Login with your email and password</h2>
                <form className={"flex flex-col gap-4 w-full"} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={"Email"}
                        placeholder={"Enter email"}
                        type={"text"}
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <TextField
                        label={"Password"}
                        placeholder={"Password"}
                        type={"password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <div className={"flex justify-center"}>
                        <Button type={"submit"}>Login</Button>
                    </div>
                </form>
                <h3 className={"font-bold text-2xl"}>Or</h3>
                <GoogleOAuthProvider clientId={"440198778505-88i2l21cmj0d32kbllbs6a49c0m0rmcl.apps.googleusercontent.com"}>
                    <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")
                    }/>
                </GoogleOAuthProvider>
                <Link to={"/register"} className={"hover:text-red-500 underline"}>
                    Or Register here
                </Link>
            </div>
            {
                message && (
                    <Snackbar open={message} autoHideDuration={1000}
                              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        <Alert severity={"success"} sx={{ mt: 2}}>{message}</Alert>
                    </Snackbar>
                )
            }
            {
                error && (
                    <Snackbar open={error} autoHideDuration={1000}
                              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        <Alert severity={"error"} sx={{ mt: 2}}>
                            {error}
                        </Alert>
                    </Snackbar>

                )
            }
        </div>
    </div>
}
