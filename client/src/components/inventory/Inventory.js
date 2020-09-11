import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPhotos } from "../../redux/actions/photo";
import InventoryItem from "./InventoryItem";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
`;

const InventoriesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 1000px;
    margin: auto;
`;

const InventoryContainer = ({ photos }) => {
    return (
        <InventoriesContainer>
            {photos.length > 0 ? (
                <Fragment>
                    {photos.map((item, index) => {
                        if (item.photos.length === 0) {
                            return null;
                        }
                        return <InventoryItem key={"gi-" + index} data={item} />;
                    })}
                </Fragment>
            ) : (
                <p>No Photos</p>
            )}
        </InventoriesContainer>
    );
};

const Inventory = ({ getPhotos, photo: { photos, loading } }) => {
    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <Container>
            {loading && <p>loading...</p>}
            <InventoryContainer photos={photos} />
        </Container>
    );
};

Inventory.propTypes = {
    getPhotos: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    photo: state.photo
});

const mapDispatchToProps = {
    getPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
