import React, { useLayoutEffect } from "react";
import AddInventory from "./AddInventory";
import EditGallery from "./EditGallery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
`;

const Dashboard = ({ getInventory, car_items }) => {
    useLayoutEffect(() => {
        getInventory();
    }, [getInventory]);
    return (
        <Container className="dashboard">
            <AddInventory />
            <EditGallery car_items={car_items} />
        </Container>
    );
};

Dashboard.propTypes = {
    getInventory: PropTypes.func,
    car_items: PropTypes.array
};

const mapStateToProps = (state) => ({
    car_items: state.inventory.car_items
});

const mapDispatchToProps = {
    getInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
