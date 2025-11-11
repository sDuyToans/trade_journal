import * as yup from "yup";

export const register_schema = yup.object().shape({
    email: yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    username: yup.string().required("Username is required")
})