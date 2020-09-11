import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPhotos } from "../../redux/actions/photo";
import InventoryItem from "./InventoryItem";
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

const Inventory = ({ getPhotos, photos, loading, fetchPhotos }) => {
    useEffect(() => {
        if (!loading && fetchPhotos) {
            getPhotos();
        }
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
    photo: state.photo,
    photos: state.photo.photos,
    loading: state.photo.loading,
    fetchPhotos: state.photo.fetchPhotos
});

const mapDispatchToProps = {
    getPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
