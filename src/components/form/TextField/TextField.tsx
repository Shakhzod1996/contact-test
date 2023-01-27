import { TextFieldProps } from "@mui/material";
import { motion } from "framer-motion";
import get from "lodash.get";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, RegisterOptions } from "react-hook-form/dist/types";
import ErrorMessage from "./ErrorMessage";
import { TextFieldElementary, TextFieldStyled } from "./TextFieldStyled";

interface ITextField {
    control: Control<any>;
    name: string;
    dark?: boolean;
    rules?: Omit<
        RegisterOptions<any, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    errors:
        | {
              [key: string]: IFieldError;
          }
        | {};
}
export type TFieldErrorType = "required" | "pattern" | "min" | "max";

export interface IFieldError {
    type: TFieldErrorType;
    message: string;
    ref: any;
    dark?: boolean;
}

const TextField: React.FC<ITextField & TextFieldProps> = ({
    control,
    rules = { required: false },
    name,
    dark,
    errors,
    ...props
}) => {
    
    return (
        <>
            {dark ? (
                <>
                    {" "}
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { ...field } }: any) => (
                            <TextFieldElementary
                                {...props}
                                {...field}
                                value={field.value || ""}
                            />
                        )}
                    />
                    <motion.div
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            marginBottom: "30px",
                        }}
                    >
                        {errors && get(errors, `${name}`, undefined) && (
                            <ErrorMessage
                                // value={get(errors, `${name}.message`, "hatolik")}
                                value="Required field!"
                            />
                        )}
                    </motion.div>
                </>
            ) : (
                <>
                    {" "}
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { ...field } }: any) => (
                            <TextFieldStyled
                                {...props}
                                {...field}
                                value={field.value || ""}
                            />
                        )}
                    />
                    <motion.div
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            marginBottom: "30px",
                        }}
                    >
                        {errors && get(errors, `${name}`, undefined) && (
                            <ErrorMessage
                                // value={get(errors, `${name}.message`, "hatolik")}
                                value="Required field!"
                            />
                        )}
                    </motion.div>
                </>
            )}
        </>
    );
};

export default TextField;
