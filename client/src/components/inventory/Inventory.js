import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

import { Grid, Segment, Image } from "semantic-ui-react";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
    margin: auto;
    max-width: 80%;
`;

const InfoContainer = styled.div`
    padding: 0.3rem;
`;

const TitleText = styled.div`
    font-size: 1rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const BodyText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const InventoryItem = ({ name, description, thumbnail, inventory_id }) => {
    return (
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Link to={`/inventory/${inventory_id}`}>
                <Segment>
                    <Image size="medium" src={thumbnail} />
                    <InfoContainer>
                        <TitleText>{name}</TitleText>
                        <BodyText>{description}</BodyText>
                    </InfoContainer>
                </Segment>
            </Link>
        </Grid.Column>
    );
};

InventoryItem.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

const InventoryContainer = ({ car_items, loading }) => {
    if (!loading && car_items.length === 0) return <div>No Items</div>;
    return (
        <Grid>
            {car_items.map((item) => {
                const { _id, name, description, photos } = item;
                const thumbIndex = photos.findIndex((element) => element.includes("thumb"));
                const thumbnail = photos[thumbIndex];
                return <InventoryItem key={v4()} name={name} description={description} thumbnail={thumbnail} inventory_id={_id} />;
            })}
        </Grid>
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
            <Spinner shown={loading} />
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
