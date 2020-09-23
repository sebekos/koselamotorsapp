import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import { Card } from "@material-ui/core";
import { v4 } from "uuid";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
`;

const InventoriesContainer = styled.div`
    width: 1000px;
    margin: auto;
`;

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 0.3rem;
    display: grid;
    grid-template-columns: 300px auto;
`;

const ImageContainer = styled.div`
    max-height: 200px;
    width: 300px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: black;
`;

const Image = styled.img`
    width: 300px;
    min-height: 200px;
    margin: auto;
    @media (max-width: 680px) {
        width: fit-content;
        border-right: none;
    }
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

const InventoryItem = ({ name, description }) => {
    return (
        <StyledCard>
            <ImageContainer>
                <Image />
            </ImageContainer>
            <InfoContainer>
                <TitleText>{name}</TitleText>
                <BodyText>{description}</BodyText>
            </InfoContainer>
        </StyledCard>
    );
};

InventoryItem.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

const InventoryContainer = ({ car_items, loading }) => {
    if (!loading && car_items.length === 0) return <div>No Items</div>;
    return (
        <InventoriesContainer>
            {car_items.map((item) => {
                const { name, description } = item;
                return <InventoryItem key={v4()} name={name} description={description} />;
            })}
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
