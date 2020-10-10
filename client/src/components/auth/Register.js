import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/auth";

import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, Form, Segment } from "semantic-ui-react";

const StyledContainer = styled.div`
    padding: 10rem 0 0;
    min-height: 100vh;
    margin: auto;
`;

const Register = ({ setAlert, register, isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        registerkey: ""
    });

    const { email, password, password2, registerkey } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({ email, password, registerkey });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <StyledContainer style={{ maxWidth: 500 }}>
            <Segment>
                <Form onSubmit={onSubmit} loading={loading}>
                    <Form.Field>
                        <Form.Input fluid label="Email" placeholder="Email" onChange={onChange} name="email" value={email} type="email" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            fluid
                            label="Password"
                            placeholder="Password"
                            onChange={onChange}
                            name="password"
                            value={password}
                            type="password"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            fluid
                            label="Retype Password"
                            placeholder="Password"
                            onChange={onChange}
                            name="password2"
                            value={password2}
                            type="password"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            fluid
                            label="Register Key"
                            placeholder="Register Key"
                            onChange={onChange}
                            name="registerkey"
                            value={registerkey}
                            type="password"
                        />
                    </Form.Field>
                    <Button type="submit" onClick={onSubmit}>
                        Register
                    </Button>
                </Form>
            </Segment>
        </StyledContainer>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

const mapDispatchToProps = { setAlert, register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
