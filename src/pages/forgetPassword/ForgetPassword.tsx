import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import TextField from "../../../components/form/TextField";
import { useApiMutation } from "../../hooks";
import { LoginContainer } from "../login/Loginstyle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const ForgetPassword = () => {
    const { mutate, data, isSuccess } = useApiMutation("admin/forget", "put");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const navigate = useNavigate();
    interface IForm {
        phoneNumber: string;
    }

    const submitHandler = ({ phoneNumber }: IForm) => {
        let inputValue = "(998)90-102-04-40";
        const inputArr = inputValue.split("");

        const removeValFromIndex = [0, 4, 7, 11, 14];
        for (let i = removeValFromIndex.length - 1; i >= 0; i--) {
            inputArr.splice(removeValFromIndex[i], 1);
        }

        mutate({
            phoneNumber: inputArr.join(""),
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully");
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
                <h2>Forget Password </h2>
                <p>Enter your phome number and receive new password.</p>
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
                    />

                    <div className="forget-password">
                        <p onClick={() => navigate("/login")}>go to login</p>
                    </div>
                    <Button
                        sx={{
                            color: "#fff",
                            border: "1px solid #fff",
                            padding: "12px",
                        }}
                        type="submit"
                        variant="outlined"
                    >
                        Submit
                    </Button>
                </form>
            </motion.div>
        </LoginContainer>
    );
};

export default ForgetPassword;
