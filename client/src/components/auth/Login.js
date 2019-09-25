import React, { Fragment, useState } from 'react';
import { setAlert } from '../../Redux/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async e => {
        e.preventDefault();
        console.log(formData);
        setAlert('Test', 'danger');
    }

    return (
        <Fragment>
            <div className="form-container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-success" value="Login" />
                </form>
            </div>

        </Fragment>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Login);
