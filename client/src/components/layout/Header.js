import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 } from "uuid";

const MaxWidth = styled.div`
    width: 1532px;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    height: 6rem;
    position: fixed;
    z-index: 1;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        height: 7rem;
    }
`;

const LogoContainer = styled.div`
    font-size: 2rem;
    color: #3e4444;
    margin-left: 6rem;
    @media (max-width: 768px) {
        margin: auto;
        font-size: 1.5rem;
    }
`;

const LinksContainer = styled.div`
    display: flex;
    justify-self: end;
    margin-right: 6rem;
    & > a {
        font-size: 1rem;
        color: #3e4444;
        margin-right: 1.5rem;
        text-decoration: none;
        &:last-child {
            margin-right: 1.5rem;
        }
    }
    @media (max-width: 768px) {
        margin: auto;
        & > a {
            font-size: 0.8rem;
            &:last-child {
                margin: auto;
            }
        }
    }
`;

const Logo = () => {
    return (
        <LogoContainer>
            <img id="main-logo" src="https://koselamotorsapp.s3.us-east-2.amazonaws.com/img/KoselaMotorsLogo4.png" alt="Kosela Motors" />
        </LogoContainer>
    );
};

const GuestLinks = ({ currMenu }) => {
    const links = {
        Home: "",
        "About Us": "aboutus",
        Services: "services",
        Inventory: "inventory",
        Contact: "contact"
    };
    const linksArray = Object.keys(links);
    return (
        <>
            {linksArray.map((o) => {
                return (
                    <Link key={v4()} to={`/${links[o]}`} className={links[o] === currMenu.toLowerCase() ? "active-link" : null}>
                        {o}
                    </Link>
                );
            })}
        </>
    );
};

const AuthLinks = ({ onLogout }) => {
    return (
        <>
            <Link to="/inventory">Inventory</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login" onClick={onLogout}>
                Logout
            </Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Header = ({ isAuthenticated, logout, history }) => {
    const [currMenu, setCurrMenu] = useState("");
    const [bottom, setBottom] = useState(false);

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const listenToScroll = () => {
        if (window.pageYOffset === 0) {
            setBottom(false);
        } else {
            setBottom(true);
        }
    };

    useEffect(() => {
        let currPath = history.location.pathname.split("/")[1];
        setCurrMenu(currPath);
        window.addEventListener("scroll", listenToScroll);
    }, [history.location.pathname]);

    history.listen((location, action) => {
        let currPath = location.pathname.split("/")[1];
        setCurrMenu(currPath);
    });

    return (
        <MaxWidth>
            <Container className={currMenu !== "" ? "nav-bottom" : ""}>
                <Logo />
                <LinksContainer>{isAuthenticated ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} />}</LinksContainer>
            </Container>
        </MaxWidth>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
