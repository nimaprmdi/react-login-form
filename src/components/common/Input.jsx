import React from "react";

const Input = ({ name, value, label, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                onChange={(e) => onChange(e)}
                value={value}
                type="text"
                className="form-control"
            />

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
