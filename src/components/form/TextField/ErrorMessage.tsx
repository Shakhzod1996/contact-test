import React, { FC } from "react";
import { ErrorMessageStyled } from "./ErrorMessage.style";
import { IErrorMessageProps } from "./ErrorMessage.types";

const ErrorMessage: FC<IErrorMessageProps> = ({ value }) => {
  return <ErrorMessageStyled>{value}</ErrorMessageStyled>;
};

export default ErrorMessage;
