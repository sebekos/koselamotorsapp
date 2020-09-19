import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import { v4 } from "uuid";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
`;

const InventoriesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 1000px;
    margin: auto;
`;

const InventoryItem = () => {
    return <div>Inventory Item</div>;
};

const InventoryContainer = ({ car_items, loading }) => {
    if (!loading && car_items.length === 0) return <div>No Items</div>;
    return (
        <InventoriesContainer>
            {car_items.map((item) => (
                <InventoryItem key={v4()} />
            ))}
        </InventoriesContainer>
    );
};

const Inventory = ({ getInventory, loading, car_items, fetch_car_items }) => {
    useLayoutEffect(() => {
        if (!loading && fetch_car_items) {
            getInventory();
        }
    }, []);

    return (
        <Container>
            {loading && <Spinner />}
            <InventoryContainer car_items={car_items} loading={loading} />
        </Container>
    );
};

Inventory.propTypes = {
    getInventory: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    car_items: PropTypes.array,
    fetch_car_items: PropTypes.bool
};

const mapStateToProps = (state) => ({
    car_items: state.inventory.car_items,
    loading: state.inventory.loading,
    fetch_car_items: state.inventory.fetch_car_items
});

const mapDispatchToProps = {
    getInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
