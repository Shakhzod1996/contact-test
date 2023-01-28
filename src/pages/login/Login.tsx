import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextFieldCustom from "../../components/form/TextField";
import { useApiMutation } from "../../hooks";
import { LoginContainer } from "./Loginstyle";
import TextField from '@mui/material/TextField';
import Skeleton from 'react-loading-skeleton'

const Login = () => {
    const { mutate, data, isSuccess } = useApiMutation("admin/login", "post");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const navigate = useNavigate();
    interface IForm {
        phoneNumber: string;
        password: string;
    }

    const submitHandler = ({ phoneNumber, password }: IForm) => {
        console.log({ phoneNumber, password });

        mutate({
            phoneNumber: inputValue,
            password,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Logged in successfully");
            navigate("/");
            localStorage.setItem("token", data?.data.token);
        }
    }, [isSuccess]);

    const [inputValue, setInputValue] = useState("");

    const handleInput = (e: any) => {
        // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setInputValue(formattedPhoneNumber);
    };

    function formatPhoneNumber(value: any) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;

        // clean the input for any non-digit values.
        const phoneNumber = value.replace(/[^\d]/g, "");

        // phoneNumberLength is used to know when to apply our formatting for the phone number
        const phoneNumberLength = phoneNumber.length;

        // we need to return the value with no formatting if its less then four digits
        // this is to avoid weird behavior that occurs if you  format the area code to early

        if (phoneNumberLength < 4) return phoneNumber;

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 5) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            5
        )}-${ phoneNumber.slice(5, 8)}-${phoneNumber.slice(
            8,
            10
        )}-${phoneNumber.slice(10, 12)}`;
    }

    return (
        <LoginContainer>
           
            <motion.div animate={{ width: "500px" }} className="login-content">
            
                <h2>Sign In </h2>
                <p>Welcome back! Please enter your details</p>
                <form
                    id="login"
                    onSubmit={handleSubmit(submitHandler)}
                    className="form"
                >
                    <TextField
                    className="real-text-field"
                        id="outlined-basic"
                        onChange={(e) => handleInput(e)}
                        value={inputValue}
                        label="Phone Number"
                        variant="outlined"
                        required
                    />

                    <TextFieldCustom
                        control={control}
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        errors={errors}
                        rules={{
                            required: true,
                        }}
                    />
                    <div className="forget-password">
                        <p onClick={() => navigate("/forget-password")}>
                            forget password ?
                        </p>
                    </div>
                    <div className="sign-btn-container">
                    <Button
                        sx={{
                            color: "#fff",
                            border: "1px solid #fff",
                            padding: "12px",
                            width: "70%"

                        }}
                        type="submit"
                        variant="outlined"
                    >
                        Sign in
                    </Button>
                    <p>or</p>
                    <Button
                    onClick={() => navigate("/sign-up")}
                        sx={{
                            color: "#fff",
                            border: "1px solid #fff",
                            padding: "12px",
                            width: "30%"
                        }}
                        type="submit"
                        variant="text"
                    >
                        Sign Up
                    </Button>
                    </div>
                    

                </form>
            </motion.div>
        </LoginContainer>
    );
};

export default Login;
