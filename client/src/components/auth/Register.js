import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/auth";
import { TextField, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    padding: 6rem 0 0;
    min-height: 100vh;
`;

const LoginContainer = styled.div`
    width: max-content;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    & > div {
        margin: 0 0 1rem 0;
    }
`;

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        registerkey: ""
    });

    const { name, email, password, password2, registerkey } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({ name, email, password, registerkey });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container>
            <LoginContainer>
                <FormContainer onSubmit={onSubmit}>
                    <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                    <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                    <TextField
                        name="password2"
                        type="password"
                        onChange={onChange}
                        value={password2}
                        label="Confirm Password"
                        variant="filled"
                    />
                    <TextField
                        name="registerkey"
                        type="password"
                        onChange={onChange}
                        value={registerkey}
                        label="Register Key"
                        variant="filled"
                    />
                    <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
                        Register
                    </Button>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Typography component="div">
                            <Box fontSize="fontSize" m={1}>
                                Have an account? Login
                            </Box>
                        </Typography>
                    </Link>
                </FormContainer>
            </LoginContainer>
        </Container>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
