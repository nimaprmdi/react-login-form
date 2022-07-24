import React from "react";
import Joi from "joi-browser";
import Input from "./Input";

const validate = (data, schema) => {
    const options = { abortEarly: false }; // aboirtEarly false will display all errors and not stop because of one error
    const { error } = Joi.validate(data, schema, options); // Validate doSubmit (function) using data and schema
    if (!error) return null; // Leave alone if we dont have any error
    const errors = {}; // Local error object
    for (let item of error.details) {
        errors[item.path[0]] = item.message; // get indexed path for example [username] and set it to message => error{ username: "Error Message" }
    }

    return errors; // It's Obvious
};

const validateProperty = ({ name, value }, schema) => {
    const obj = { [name]: value }; // Create an object using name input (Dynamically) and value static ( [username] : nima )
    const localSchema = { [name]: schema[name] }; // create a schema using dynamic input name and get the index of schemal(outside) state => [username] : schema.username
    const { error } = Joi.validate(obj, localSchema); // Validate data using given data (obj) and localSchema[Indexed Schema]
    return error ? error.details[0].message : null; // If we have error return otherwise nothing
};

const handleChange = ({ currentTarget: input }, data, setData, allErrors, setAllErrors, schema) => {
    // Error checker
    const errors = { ...allErrors }; // Copy all errors {state}
    const errorsMessage = validateProperty(input, schema); // validate input using given function
    if (errorsMessage) errors[input.name] = errorsMessage; // set errors => "errors.username" to "errorMessage"
    else delete errors[input.name]; // remove key of object if we dont have an error

    // Changing Inputs
    const dataClone = { ...data }; // Clone data state
    dataClone[input.name] = input.value; // Change data {state} value with real input value
    setData(dataClone); // Set global data state
    setAllErrors(errors); // Set global errors state
};

const handleSubmit = (e, data, setAllErrors, doSubmit, schema) => {
    e.preventDefault(); // Prevent Refreshing page

    const errors = validate(data, schema); // Handle State errors and put it in the errors variable
    setAllErrors(errors || {}); // Set Errors {State} to errors variable - If was empty set to empty object
    if (errors) return; // If errors was true then do nothing

    doSubmit(); // Outside do submit ( The api for example ) => Mixed Function
};

const renderInput = (name, label, data, setData, allErrors, setAllErrors, schema, type = "text") => {
    return (
        <Input
            name={name}
            value={data[name]}
            error={allErrors[name]}
            onChange={(e) => handleChange(e, data, setData, allErrors, setAllErrors, schema)}
            label={label}
            type={type}
        />
    );
};

const renderButton = (data, schema, label) => {
    return (
        <button disabled={validate(data, schema)} className="btn btn-primary bt-lg">
            {label}
        </button>
    );
};

export { validate, validateProperty, handleChange, handleSubmit, renderInput, renderButton };
