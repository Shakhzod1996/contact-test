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
import TextField from "@mui/material/TextField";
const SignUp = () => {
    const { mutate, data, isSuccess } = useApiMutation("user", "post");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const navigate = useNavigate();
    interface IForm {
        phoneNumber: string;
        password: string;
        lastName: string    
        firstName: string
    }

    const submitHandler = ({ phoneNumber, password, firstName, lastName }: IForm) => {
        let inputValue1 = inputValue;
        const inputArr = inputValue1.split("");

        const removeValFromIndex = [0, 4,5, 8, 12, 15];
        for (let i = removeValFromIndex.length - 1; i >= 0; i--) {
            inputArr.splice(removeValFromIndex[i], 1);
        }
        
        
        mutate({
            phoneNumber: inputArr.join(""),
            password,
            firstName,
            lastName
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully registered and now just log in");

            setTimeout(() => {
                
                navigate("/login");
            }, 1000);
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
        )}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(
            8,
            10
        )}-${phoneNumber.slice(10, 12)}`;
    }

    return (
        <LoginContainer>
            <motion.div animate={{ width: "500px" }} className="login-content">
                <h2>Sign Up </h2>
                <p>Sign up, create and store your contacts</p>
                <form
                    id="login"
                    onSubmit={handleSubmit(submitHandler)}
                    className="form"
                >
                    <TextFieldCustom
                        control={control}
                        label="First Name"
                        variant="outlined"
                        type="text"
                        name="firstName"
                        errors={errors}
                        rules={{
                            required: true,
                        }}
                    />

                    <TextFieldCustom
                        control={control}
                        label="Last Name"
                        variant="outlined"
                        type="lastName"
                        name="lastName"
                        errors={errors}
                        rules={{
                            required: true,
                        }}
                    />

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
                        label="Create Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        errors={errors}
                        rules={{
                            required: true,
                        }}
                    />

                    <div className="sign-btn-container">
                        <Button
                            sx={{
                                color: "#fff",
                                border: "1px solid #fff",
                                padding: "12px",
                                width: "70%",
                            }}
                            type="submit"
                            variant="outlined"
                        >
                            Sign Up
                        </Button>
                        <p>or</p>
                        <Button
                            onClick={() => navigate("/login")}
                            sx={{
                                color: "#fff",
                                border: "1px solid #fff",
                                padding: "12px",
                                width: "30%",
                            }}
                            type="submit"
                            variant="text"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </motion.div>
        </LoginContainer>
    );
};

export default SignUp;
