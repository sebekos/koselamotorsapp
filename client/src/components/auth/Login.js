import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login, setAuthLoading } from '../../Redux/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Login = ({
  auth: { isAuthenticated, loading },
  login,
  setAuthLoading
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async e => {
    setAuthLoading();
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='form-container'>
        {loading ? <Spinner /> : null}
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p>
        <form className='form' onSubmit={onSubmitHandler}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <input type='submit' className='btn btn-success' value='Login' />
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAuthLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login, setAuthLoading }
)(Login);
