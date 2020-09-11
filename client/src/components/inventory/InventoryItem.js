import React from "react";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const CardContainer = styled(Card)`
    border: 1px solid #f2f2f2;
    position: relative;
    display: grid;
    grid-template-columns: 300px 500px;
    box-sizing: border-box;
    margin: 5px 5px;
    max-width: 800px;
    height: 195px;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        height: auto;
        max-width: 250px;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 300px;
    background-color: black;
    border-right: 1px solid lightgrey;
`;

const Image = styled.img`
    object-fit: cover;
    height: 200px;
`;

const TextContainer = styled.div`
    position: relative;
    height: 100%;
`;

const DescriptionContainer = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0.5rem;
`;

const TitleContainer = styled.div`
    text-align: center;
    font-weight: bold;
`;

const InventoryItem = ({ data: { photos, name, _id, description } }) => {
    return (
        <Container>
            <Link to={"/gallery/" + _id}>
                <CardContainer key={v4()}>
                    <ImageContainer>
                        <Image src={photos[0]} alt="Error" />
                    </ImageContainer>
                    <TextContainer>
                        <TitleContainer>{name}</TitleContainer>
                        <DescriptionContainer>{description}</DescriptionContainer>
                    </TextContainer>
                </CardContainer>
            </Link>
        </Container>
    );
};

export default InventoryItem;
