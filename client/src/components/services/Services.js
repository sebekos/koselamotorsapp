import React from "react";
import styled from "styled-components";
import ServicesPng from "../../img/services.png";

const Container = styled.div`
    padding-top: 6rem;
    min-height: 100vh;
`;

const VehicleServicesContainer = styled.div`
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    align-items: center;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ImgContainer = styled.div`
    max-width: 650px;
    padding: 5rem 3rem;
    @media (max-width: 768px) {
        display: none;
    }
`;

const Img = styled.img`
    max-width: 400px;
    height: auto;
`;

const Image = () => {
    return (
        <ImgContainer>
            <Img src={ServicesPng} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    text-align: center;
    max-width: 650px;
    padding: 5rem 3rem;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <TextTitle>Services</TextTitle>
            <TextDesc>
                Witamy na stronie www.pytlewski.pl. Wszystkie aktualne informacje dotyczące strony będą podawane tutaj pod zdjęciem młyna.
                Zapraszamy ponownie...
            </TextDesc>
        </TextContainer>
    );
};

const Services = () => {
    return (
        <Container>
            <VehicleServicesContainer>
                <Image />
                <Text />
            </VehicleServicesContainer>
        </Container>
    );
};

export default Services;
