import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";
import { handleChange, handleSubmit, renderInput, renderButton } from "./common/Form";

const LoginForm = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [allErrors, setAllErrors] = useState({});

    const schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().min(4).label("Password"),
    };

    const doSubmit = () => {
        console.log("Submit");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, data, setAllErrors, doSubmit, schema)}>
            {renderInput("username", "UserName", data, setData, allErrors, setAllErrors, schema)}
            {renderInput("password", "Password", data, setData, allErrors, setAllErrors, schema, "password")}

            {renderButton(data, schema, "Submit")}
        </form>
    );
};

export default LoginForm;
