import React from "react";
import LandingImage from "../../img/showcase2.jpg";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const MainBackground = styled.div`
    background-image: url(${LandingImage});
    min-height: 100vh;
    background-position: center top 0rem;
    background-repeat: no-repeat;
    background-size: auto;
    background-color: lightgrey;
    @media (max-width: 768px) {
        min-height: 300px;
        background-size: cover;
    }
`;

const Showcase = () => {
    return (
        <Container>
            <MainBackground />
        </Container>
    );
};

export default Showcase;
