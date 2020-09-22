import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { Card } from "@material-ui/core";

const Container = styled.div``;

const StyledCard = styled(Card)`
    margin: auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ImageContainer = styled.div``;

const InfoContainer = styled.div``;

const Empty = () => {
    return <div>No Items</div>;
};

const InventoryItem = () => {
    return (
        <StyledCard>
            <ImageContainer>Image</ImageContainer>
            <InfoContainer>Info</InfoContainer>
        </StyledCard>
    );
};

const EditInventory = ({ car_items }) => {
    if (car_items.length === 0) return <Empty />;
    return (
        <Container>
            {car_items.map((item) => {
                return <InventoryItem key={v4()} item={item} />;
            })}
        </Container>
    );
};

EditInventory.propTypes = {
    car_items: PropTypes.array
};

export default EditInventory;
