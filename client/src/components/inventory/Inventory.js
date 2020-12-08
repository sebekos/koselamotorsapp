import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInventory } from "../../redux/actions/inventory";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

const Container = styled.div`
    padding: 8rem 0 0;
    min-height: 100vh;
    margin: auto;
    width: max-content;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const InfoContainer = styled.div`
    padding: 0.3rem;
`;

const TitleText = styled.div`
    font-size: 1rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-weight: bold;
    padding: 5px;
`;

const BodyText = styled.div`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    width: 100%;
    border-top: 1px solid lightgrey;
    padding: 5px;
`;

const ImageContainerMain = styled.div`
    height: 300px;
    min-width: 450px;
    overflow: hidden;
    width: fit-content;
    cursor: pointer;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
`;

const ImageSrcMain = styled.img`
    height: 298px;
    width: 448px;
    object-fit: cover;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
`;

const ImageMain = ({ img }) => {
    return (
        <ImageContainerMain>
            <ImageSrcMain src={img} alt="photo" />
        </ImageContainerMain>
    );
};

const ItemContainer = styled.div`
    width: 450px;
    margin: 1rem 0.5rem auto;
    border: 1px solid lightgrey;
    border-radius: 7px;
`;

const InventoryItem = ({ name, description, thumbnail, inventory_id, status }) => {
    return (
        <Link style={{ padding: 0 }} to={`/inventory/${inventory_id}`}>
            <ItemContainer>
                {/* <Image size="medium" src={thumbnail} /> */}
                <ImageMain img={thumbnail} />
                <InfoContainer>
                    <TitleText>
                        {status} - {name}
                    </TitleText>
                    <BodyText>{description}</BodyText>
                </InfoContainer>
            </ItemContainer>
        </Link>
    );
};

InventoryItem.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 925px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const InventoryContainer = ({ car_items, loading }) => {
    if (!loading && car_items.length === 0) return <div>No Items</div>;
    return (
        <GridContainer>
            {car_items.map((item) => {
                const { _id, name, description, photos, status } = item;
                const thumbIndex = photos.findIndex((element) => element.includes("thumb"));
                const thumbnail = photos[thumbIndex];
                return <InventoryItem key={v4()} name={name} description={description} thumbnail={thumbnail} inventory_id={_id} status={status} />;
            })}
        </GridContainer>
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
            <MainTitle>Inventory</MainTitle>
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
