import React, { useLayoutEffect } from "react";
import AddInventory from "./AddInventory";
import EditInventory from "./EditInventory";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

import { Divider } from "semantic-ui-react";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
`;

const Dashboard = ({ getInventory, car_items, loading, fetch_car_items }) => {
    useLayoutEffect(() => {
        if (!loading && fetch_car_items) getInventory();
    }, []);
    return (
        <Container className="dashboard">
            <Spinner shown={loading} />
            <AddInventory />
            <Divider style={{ margin: "1rem 3rem" }} />
            <EditInventory car_items={car_items} loading={loading} />
        </Container>
    );
};

Dashboard.propTypes = {
    getInventory: PropTypes.func,
    car_items: PropTypes.array,
    loading: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
