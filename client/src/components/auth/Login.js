import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Spinner from "../universal/Spinner";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    padding: 6rem 0 0;
    min-height: 100vh;
`;

const LoginContainer = styled.div`
    width: max-content;
    position: fixed;
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

const Login = ({ isAuthenticated, loading, login }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container>
            <LoginContainer>
                {loading && <Spinner />}
                <FormContainer onSubmit={onSubmit}>
                    <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                    <TextField name="password" type="password" onChange={onChange} value={password} label="Password" variant="filled" />
                    <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
                        Login
                    </Button>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <Typography component="div">
                            <Box fontSize="fontSize" m={1}>
                                Don't have an account? Register
                            </Box>
                        </Typography>
                    </Link>
                </FormContainer>
            </LoginContainer>
        </Container>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
