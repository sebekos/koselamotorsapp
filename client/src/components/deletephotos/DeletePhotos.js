import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOneInventory, removeMedia, saveMedia } from "../../redux/actions/inventory";
import { v4 } from "uuid";
import Spinner from "../universal/Spinner";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
    margin: auto;
    width: max-content;
    @media (max-width: 768px) {
        padding: 9rem 0 0;
    }
`;

const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: max-content;
    margin: auto;
`;

const ImagePreview = styled.img`
    max-width: 200px;
`;

const RemoveButton = styled.button`
    position: absolute;
`;

const ImageContainer = styled.div`
    position: relative;
    margin: 0.5rem;
`;

const ButtonContainer = styled.div`
    margin: 0 auto 0.5rem;
    width: max-content;
    & > button:first-child {
        margin-right: 0.5rem;
    }
`;

const DeletePhotos = ({ getOneInventory, removeMedia, saveMedia, car_item, loading, match }) => {
    useLayoutEffect(() => {
        getOneInventory(match.params.id);
    }, []);

    const history = useHistory();

    const onRemove = (e) => {
        let url = e.target.getAttribute("value").split("-thumb-");
        removeMedia(url[0]);
    };

    const onSave = () => {
        saveMedia(car_item.photos, match.params.id);
    };

    const onBack = () => {
        history.push("/dashboard");
    };

    return (
        <Container>
            <Spinner shown={loading} />
            <ButtonContainer>
                <Button variant="contained" onClick={onSave}>
                    Save
                </Button>
                <Button variant="contained" color="primary" onClick={onBack}>
                    Back
                </Button>
            </ButtonContainer>
            <ImagesContainer>
                {car_item &&
                    car_item.photos &&
                    car_item.photos
                        .filter((o) => o.includes("-thumb-"))
                        .map((image) => {
                            return (
                                <ImageContainer key={v4()}>
                                    <RemoveButton value={image} onClick={onRemove}>
                                        X
                                    </RemoveButton>
                                    <ImagePreview src={image} alt="img" />
                                </ImageContainer>
                            );
                        })}
            </ImagesContainer>
        </Container>
    );
};

DeletePhotos.propTypes = {
    getOneInventory: PropTypes.func.isRequired,
    removeMedia: PropTypes.func.isRequired,
    saveMedia: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    car_item: PropTypes.object,
    fetch_car_items: PropTypes.bool
};

const mapStateToProps = (state) => ({
    car_item: state.inventory.car_item,
    loading: state.inventory.loading,
    fetch_car_items: state.inventory.fetch_car_items
});

const mapDispatchToProps = {
    getOneInventory,
    removeMedia,
    saveMedia
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePhotos);
