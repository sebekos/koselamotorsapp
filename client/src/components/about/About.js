import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 8rem;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
    @media (max-width: 1000px) {
        padding: 1rem 0 2rem;
    }
`;

const About = () => {
    return (
        <Container>
            <MainTitle>About Us</MainTitle>
        </Container>
    );
};

export default About;
