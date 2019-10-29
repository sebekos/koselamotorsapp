import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../Redux/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onLogout = e => {
    e.preventDefault();
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>

      <li>
        <Link to='/services'>Services</Link>
      </li>
      <li>
        <Link to='/gallery'>Gallery</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/services'>Services</Link>
      </li>
      <li>
        <Link to='/gallery'>Gallery</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  );

  return (
    <header>
      <div className='container'>
        <div className='navbar'>
          <div id='branding'>
            <Link to='/'>
              <h1>
                <img
                  id='main-logo'
                  src='https://koselamotorsapp.s3.us-east-2.amazonaws.com/img/KoselaMotorsLogo4.png'
                  alt='Kosela Motors'
                />
              </h1>
            </Link>
          </div>
          <nav>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
