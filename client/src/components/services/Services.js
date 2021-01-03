import React from "react";
import styled from "styled-components";
import Service1 from "../../img/service1.jpg";
import Service2 from "../../img/service2.jpg";
import Service3 from "../../img/service3.jpg";
import CardItem from "./CardItem";

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

const VehicleServicesContainer = styled.div`
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    align-items: center;
    justify-items: center;
    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        width: 95%;
    }
`;

const ImgContainer = styled.div`
    width: 400px; /*any size*/
    height: 350px; /*any size*/
    position: relative;
`;

const Img = styled.img`
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 3px;
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

const Image3 = () => {
    return (
        <ImgContainer>
            <Img src={Service3} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    max-width: 650px;
    padding: 5rem 3rem;
    @media (max-width: 1000px) {
        padding: 1rem;
    }
`;

const service1Text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam erat, ornare in varius a, scelerisque ac turpis. Proin rhoncus augue erat, eget sagittis justo elementum ac. Lorem
ipsum dolor sit amet, consectetur adipiscing elit. In dictum augue eu dui porta ornare. Donec accumsan lectus id urna tincidunt lacinia. Mauris in enim blandit metus luctus congue quis
sed tellus. Maecenas nunc augue, dictum sed posuere id, lacinia nec ante. Nullam vel condimentum lectus. Sed maximus lacinia feugiat. Vivamus purus dolor, pharetra elementum luctus et,
facilisis vel tellus. Etiam placerat rutrum sagittis. Nulla sodales turpis sem, quis iaculis lorem dignissim nec. Cras ornare velit metus, in pulvinar enim porta non. Quisque
sollicitudin elit eget est venenatis, at iaculis lacus posuere. Nulla facilisi. Proin lorem tortor, sollicitudin non nulla in, posuere hendrerit tellus.`;

const service2Text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam erat, ornare in varius a, scelerisque ac turpis. Proin rhoncus augue erat, eget sagittis justo elementum ac. Lorem
ipsum dolor sit amet, consectetur adipiscing elit. In dictum augue eu dui porta ornare. Donec accumsan lectus id urna tincidunt lacinia. Mauris in enim blandit metus luctus congue quis
sed tellus. Maecenas nunc augue, dictum sed posuere id, lacinia nec ante. Nullam vel condimentum lectus. Sed maximus lacinia feugiat. Vivamus purus dolor, pharetra elementum luctus et,
facilisis vel tellus. Etiam placerat rutrum sagittis. Nulla sodales turpis sem, quis iaculis lorem dignissim nec. Cras ornare velit metus, in pulvinar enim porta non. Quisque
sollicitudin elit eget est venenatis, at iaculis lacus posuere. Nulla facilisi. Proin lorem tortor, sollicitudin non nulla in, posuere hendrerit tellus.`;

const service3Text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam erat, ornare in varius a, scelerisque ac turpis. Proin rhoncus augue erat, eget sagittis justo elementum ac. Lorem
ipsum dolor sit amet, consectetur adipiscing elit. In dictum augue eu dui porta ornare. Donec accumsan lectus id urna tincidunt lacinia. Mauris in enim blandit metus luctus congue quis
sed tellus. Maecenas nunc augue, dictum sed posuere id, lacinia nec ante. Nullam vel condimentum lectus. Sed maximus lacinia feugiat. Vivamus purus dolor, pharetra elementum luctus et,
facilisis vel tellus. Etiam placerat rutrum sagittis. Nulla sodales turpis sem, quis iaculis lorem dignissim nec. Cras ornare velit metus, in pulvinar enim porta non. Quisque
sollicitudin elit eget est venenatis, at iaculis lacus posuere. Nulla facilisi. Proin lorem tortor, sollicitudin non nulla in, posuere hendrerit tellus.`;

const Text1 = () => {
    return (
        <TextContainer>
            <CardItem title="Custom Builds" text={service1Text} />
        </TextContainer>
    );
};

const Text2 = () => {
    return (
        <TextContainer>
            <CardItem title="Engine Work" text={service2Text} />
        </TextContainer>
    );
};

const Text3 = () => {
    return (
        <TextContainer>
            <CardItem title="Maintenance" text={service3Text} />
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
            <VehicleServicesContainer>
                <Image3 />
                <Text3 />
            </VehicleServicesContainer>
        </Container>
    );
};

export default Services;
