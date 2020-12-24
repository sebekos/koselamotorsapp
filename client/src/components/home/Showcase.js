import React from "react";
import LandingImage from "../../img/showcase2.jpg";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    margin: auto;
    max-width: 1900px;
`;

const MainBackground = styled.div`
    background-image: url(${LandingImage});
    min-height: 100vh;
    background-position: center top 0rem;
    background-repeat: no-repeat;
    background-size: auto;
    background-color: lightgrey;
    @media (max-width: 768px) {
        min-height: 500px;
        background-size: cover;
    }
`;

const InsideContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: rgba(55, 54, 51, 0.6);
    box-shadow: 0px 0px 25px 25px rgba(55, 54, 51, 0.6);
    padding: 2rem;
    border-radius: 3rem;
    @media (max-width: 768px) {
        white-space: normal;
        line-height: 3rem;
        background-color: rgba(55, 54, 51, 0.4);
        box-shadow: 0px 0px 25px 25px rgba(55, 54, 51, 0.4);
    }
`;

const WelcomeContainer = styled.div`
    font-size: 3rem;
    color: white;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    white-space: nowrap;
    @media (max-width: 768px) {
        white-space: normal;
        line-height: 3rem;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    width: max-content;
    margin: auto;
`;

const Btn = styled(Button)`
    margin: 1rem;
`;

const Showcase = () => {
    let history = useHistory();
    return (
        <Container>
            <MainBackground />
            <InsideContainer>
                <WelcomeContainer>Welcome To Kosela Motors</WelcomeContainer>

                <BtnContainer>
                    <Btn onClick={() => history.push("/Inventory")} style={{ margin: 5 }}>
                        View Inventory
                    </Btn>
                    <Btn onClick={() => history.push("/Services")} style={{ margin: 5 }}>
                        My Services
                    </Btn>
                </BtnContainer>
            </InsideContainer>
        </Container>
    );
};

export default Showcase;
