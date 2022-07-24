import React, { useState } from "react";
import Joi from "joi-browser";
import { renderInput, renderButton, handleSubmit } from "./common/Form";

const RegisterForm = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
        name: "",
    });

    const [allErrors, setAllErccccccrors] = useState({});

    const schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(4).label("Password"),
        name: Joi.string().required().min(3).label("Name"),
    };

    const doSubmit = () => {
        console.log("Submit");
    };

    return (
        <form className="px-3" onSubmit={(e) => handleSubmit(e, data, setAllErrors, doSubmit, schema)}>
            {renderInput("username", "UserName", data, setData, allErrors, setAllErrors, schema)}
            {renderInput("password", "Password", data, setData, allErrors, setAllErrors, schema, "password")}
            {renderInput("name", "Name", data, setData, allErrors, setAllErrors, schema)}

            {renderButton(data, schema, "Submit")}
        </form>
    );
};

export default RegisterForm;
