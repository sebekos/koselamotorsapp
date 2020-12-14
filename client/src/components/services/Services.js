import React from "react";
import styled from "styled-components";
import Service1 from "../../img/service1.jpg";
import Service2 from "../../img/service2.jpg";

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
    @media (max-width: 768px) {
        padding: 1rem 0 2rem;
    }
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
    text-align: center;
    max-width: 650px;
    padding: 5rem 3rem;
    @media (max-width: 768px) {
        padding: 0rem;
    }
`;

const Img = styled.img`
    max-width: 400px;
    height: auto;
`;

const Image1 = () => {
    return (
        <ImgContainer>
            <Img src={Service1} />
        </ImgContainer>
    );
};

const Image2 = () => {
    return (
        <ImgContainer>
            <Img src={Service2} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    max-width: 650px;
    padding: 5rem 3rem;
    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
    text-align: center;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const Text1 = () => {
    return (
        <TextContainer>
            <TextTitle>Custom Builds</TextTitle>
            <TextDesc>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam erat, ornare in varius a, scelerisque ac turpis. Proin rhoncus augue erat, eget sagittis justo elementum ac. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. In dictum augue eu dui porta ornare. Donec accumsan lectus id urna tincidunt lacinia. Mauris in enim blandit metus luctus congue quis
                sed tellus. Maecenas nunc augue, dictum sed posuere id, lacinia nec ante. Nullam vel condimentum lectus. Sed maximus lacinia feugiat. Vivamus purus dolor, pharetra elementum luctus et,
                facilisis vel tellus. Etiam placerat rutrum sagittis. Nulla sodales turpis sem, quis iaculis lorem dignissim nec. Cras ornare velit metus, in pulvinar enim porta non. Quisque
                sollicitudin elit eget est venenatis, at iaculis lacus posuere. Nulla facilisi. Proin lorem tortor, sollicitudin non nulla in, posuere hendrerit tellus.
            </TextDesc>
        </TextContainer>
    );
};

const Text2 = () => {
    return (
        <TextContainer>
            <TextTitle>Engine Work</TextTitle>
            <TextDesc>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam erat, ornare in varius a, scelerisque ac turpis. Proin rhoncus augue erat, eget sagittis justo elementum ac. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. In dictum augue eu dui porta ornare. Donec accumsan lectus id urna tincidunt lacinia. Mauris in enim blandit metus luctus congue quis
                sed tellus. Maecenas nunc augue, dictum sed posuere id, lacinia nec ante. Nullam vel condimentum lectus. Sed maximus lacinia feugiat. Vivamus purus dolor, pharetra elementum luctus et,
                facilisis vel tellus. Etiam placerat rutrum sagittis. Nulla sodales turpis sem, quis iaculis lorem dignissim nec. Cras ornare velit metus, in pulvinar enim porta non. Quisque
                sollicitudin elit eget est venenatis, at iaculis lacus posuere. Nulla facilisi. Proin lorem tortor, sollicitudin non nulla in, posuere hendrerit tellus.
            </TextDesc>
        </TextContainer>
    );
};

const Services = () => {
    return (
        <Container>
            <MainTitle>Services</MainTitle>
            <VehicleServicesContainer>
                <Image1 />
                <Text1 />
            </VehicleServicesContainer>
            <VehicleServicesContainer>
                <Text2 />
                <Image2 />
            </VehicleServicesContainer>
        </Container>
    );
};

export default Services;
