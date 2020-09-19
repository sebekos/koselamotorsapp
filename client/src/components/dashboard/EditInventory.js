import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const Container = styled.div``;

const Empty = () => {
    return <div>No Items</div>;
};

const InventoryItem = () => {
    return <div>Item</div>;
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
