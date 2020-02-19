import React, { useState } from "react";
import { connect } from "react-redux";

const Reset = () => {
    const [email, setEmail] = useState("");

    const onChangeHandler = e => setEmail(e.target.value);

    const onSubmitHandler = async e => {
        e.preventDefault();
    };

    return (
        <div className="form-container">
            <h1 className="large text-primary">Password Reset</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Enter the email associated with your account.
            </p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    );
};

export default connect(null, null)(Reset);
