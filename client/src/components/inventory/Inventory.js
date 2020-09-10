import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPhotos } from "../../redux/actions/photo";
import InventoryItem from "./InventoryItem";
import styled from "styled-components";

const Container = styled.div`
    padding: 6rem 0 0;
`;

const GalleriesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: max-content;
    margin: auto;
`;

const Inventory = ({ getPhotos, photo: { photos, loading } }) => {
    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <Container>
            {loading && <p>loading...</p>}
            <GalleriesContainer>
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
            </GalleriesContainer>
        </Container>
    );
};

Inventory.propTypes = {
    getPhotos: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    photo: state.photo
});

export default connect(mapStateToProps, { getPhotos })(Inventory);
