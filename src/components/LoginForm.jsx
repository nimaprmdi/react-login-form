import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";

const LoginForm = () => {
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });

    const [allErrors, setAllErrors] = useState({}); // Global errors state - The Primary One

    const schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    const validate = () => {
        const result = Joi.validate(account, schema, { abortEarly: false });

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    };

    const validateProperty = ({ name, value }) => {
        if (name === "username") {
            if (value.trim() === "") return "Username is empty";
        }

        if (name === "password") {
            if (value.trim() === "") return "Password is empty";
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        // Error checker
        const errors = { ...allErrors }; // Copy all errors {state}
        const errorsMessage = validateProperty(input); // validate input using given function
        if (errorsMessage) errors[input.name] = errorsMessage; // set errors => "errors.username" to "errorMessage"
        else delete errors[input.name];

        // Changing Inputs
        const accountClone = { ...account }; // Clone account state
        accountClone[input.name] = input.value; // Change account {state} value with real input value
        setAccount(accountClone); // Set global account state
        setAllErrors(errors);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent Refreshing page

        const errors = validate(); // Handle State errors and put it in the errors variable
        setAllErrors(errors || {}); // Set Errors {State} to errors variable - If was empty set to empty object
        if (errors) return; // If errors was true then do nothing
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input
                name="username"
                value={account.username}
                error={allErrors.username}
                onChange={(e) => handleChange(e)}
                label="Username"
            />

            <Input
                name="password"
                value={account.password}
                error={allErrors.password}
                onChange={(e) => handleChange(e)}
                label="Password"
            />

            <button className="btn btn-primary bt-lg">Submit</button>
        </form>
    );
};

export default LoginForm;
