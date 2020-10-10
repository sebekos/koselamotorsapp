import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Button, Form, Segment } from "semantic-ui-react";

import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContainer = styled.div`
    padding: 10rem 0 0;
    min-height: 100vh;
    margin: auto;
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
                    <Button type="submit" onClick={onSubmit}>
                        Login
                    </Button>
                </Form>
            </Segment>
        </StyledContainer>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
