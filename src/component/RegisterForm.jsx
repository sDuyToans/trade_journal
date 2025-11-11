import React, { useState } from "react";
import Button from "./common/Button.jsx";
import { Link } from "react-router/internal/react-server-client";
import { IoIosArrowRoundBack } from "react-icons/io";
import { motion } from "motion/react";
import { Alert, Snackbar, TextField } from "@mui/material";
import {useSignUpMutation, useVerifyGoogleTokenMutation} from "../api/authApi.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { register_schema } from "../schema/register_schema.js";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const wordVariants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export default function RegisterForm() {
    const [signup, { isLoading: registerLoading }] = useSignUpMutation();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loginGoogle] = useVerifyGoogleTokenMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(register_schema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    });

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
            const res = await signup(data).unwrap();
            if (res.message) {
                setMessage(res.message || "Signup Successfully!");
                setTimeout(() => (window.location.href = "/"), 1000);
            }
        } catch (e) {
            console.log(e);
            setError(e?.data?.message || "Invalid email, password, or username");
        }
    };

    return (
        <div className="w-full justify-center h-full mt-5 md:mt-20 items-center">
            <div className="flex flex-col md:flex-row max-w-[900px] h-[80%] bg-white mx-auto shadow-2xl justify-between">
                <div className="text-black flex flex-col justify-center items-center gap-3 bg-amber-50 flex-1 p-3 relative">
                    <motion.div
                        className="absolute -bottom-8 right-3 md:right-3 md:bottom-3"
                        variants={wordVariants}
                        animate="animate"
                    >
                        <Link to="/" className="flex gap-2 items-center self-end">
                            <IoIosArrowRoundBack size={20} />
                            <span>Go back home</span>
                        </Link>
                    </motion.div>

                    <h2 className="font-bold text-2xl">
                        Sign up with your email and password
                    </h2>

                    <form
                        className="flex flex-col gap-4 w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    placeholder="Enter email"
                                    type="text"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    placeholder="Username"
                                    type="text"
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />

                        <div className="flex justify-center">
                            <Button type="submit" disabled={registerLoading}>
                                {registerLoading ? "Registering..." : "Register"}
                            </Button>
                        </div>
                    </form>

                    <h3 className="font-bold text-2xl">Or</h3>

                    <GoogleOAuthProvider clientId={"440198778505-88i2l21cmj0d32kbllbs6a49c0m0rmcl.apps.googleusercontent.com"}>
                        <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")
                        }/>
                    </GoogleOAuthProvider>

                    <Link to="/login" className="hover:text-green-500 underline">
                        Or Login here
                    </Link>
                </div>

                <img
                    src="/images/loginimg.avif"
                    alt="img_login"
                    className="flex-1 h-full"
                />
            </div>

            {/* Snackbar for success and error */}
            {message && (
                <Snackbar
                    open={!!message}
                    autoHideDuration={1000}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                </Snackbar>
            )}

            {error && (
                <Snackbar
                    open={!!error}
                    autoHideDuration={1000}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}