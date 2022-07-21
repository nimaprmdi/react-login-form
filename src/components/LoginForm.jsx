import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";
import {
    data,
    setData,
    allErrors,
    setAllErrors,
    validate,
    validateProperty,
    handleChange,
    handleSubmit,
} from "./common/Form";

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
            <Input
                name="username"
                value={data.username}
                error={allErrors.username}
                onChange={(e) => handleChange(e, data, setData, allErrors, setAllErrors, schema)}
                label="Username"
            />

            <Input
                name="password"
                value={data.password}
                error={allErrors.password}
                onChange={(e) => handleChange(e, data, setData, allErrors, setAllErrors, schema)}
                label="Password"
            />

            <button disabled={validate(data, schema)} className="btn btn-primary bt-lg">
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
