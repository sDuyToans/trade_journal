import * as yup from "yup"
export const trade_schema = yup.object().shape({
    // type: yup.string().required("Trade type is required"),
    amount: yup
        .number()
        .typeError("Amount must be in number format")
        .required("Amount is required"),
    note: yup
        .string()
        .min(0)
        .max(500, "Maximum note is 500 characters long")
});