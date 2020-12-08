import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOneInventory } from "../../redux/actions/inventory";
import { v4 } from "uuid";
import PhotoViewer from "./PhotoViewer";
import Spinner from "../universal/Spinner";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
    min-height: 100vh;
    margin: auto;
    width: max-content;
`;

const ImageContainerThumb = styled.div`
    height: 150px;
    min-width: 200px;
    overflow: hidden;
    width: fit-content;
    cursor: pointer;
    background-color: lightgrey;
`;

const ImageSrcThumb = styled.img`
    border: 1px solid lightgrey;
    height: 148px;
    width: 198px;
    object-fit: cover;
`;

const ImageThumb = ({ link_thumb, onClick }) => {
    return (
        <div onClick={onClick}>
            <ImageContainerThumb>
                <ImageSrcThumb src={link_thumb} alt="photo" />
            </ImageContainerThumb>
        </div>
    );
};

const ImageContainerMain = styled.div`
    height: 350px;
    min-width: 500px;
    overflow: hidden;
    width: fit-content;
    cursor: pointer;
    background-color: lightgrey;
    border-top-left-radius: 7px;
`;

const ImageSrcMain = styled.img`
    border: 1px solid lightgrey;
    height: 348px;
    width: 498px;
    object-fit: cover;
    border-top-left-radius: 7px;
`;

const ImageMain = ({ img, onClickThumbnail }) => {
    return (
        <ImageContainerMain>
            <ImageSrcMain src={img} alt="photo" onClick={onClickThumbnail} />
        </ImageContainerMain>
    );
};

const InfoContainer = styled.div`
    height: 350px;
    min-width: 500px;
    padding: 10px;
    border: 1px solid lightgrey;
    border-top-right-radius: 7px;
    overflow-y: scroll;
`;

const TitleContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 5px;
    font-weight: bold;
    font-size: 1.5rem;
`;

const Title = ({ title }) => {
    return <TitleContainer>{title}</TitleContainer>;
};

const TextContainer = styled.div`
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
`;

const Text = ({ text }) => {
    return <TextContainer>{text}</TextContainer>;
};

const Info = ({ name, description }) => {
    return (
        <InfoContainer>
            <Title title={name} />
            <Text text={description} />
        </InfoContainer>
    );
};

const CarContainer = styled.div`
    display: grid;
    grid-template-columns: 500px 500px;
`;

const ThumbsContainer = styled.div`
    margin: auto;
    width: max-content;
    display: grid;
    grid-template-columns: repeat(5, 200px);
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 200px);
    }
`;

const Car = ({ car_item }) => {
    const { photos = [], name, description } = car_item;
    const [currImg, setCurrImg] = useState(0);
    const [open, setOpen] = useState(false);
    const thumbs = photos.filter((o) => o.includes("thumb"));
    const regs = photos.filter((o) => o.includes("reg"));
    const mainPhotoIndex = photos.findIndex((element) => element.includes("reg"));
    const mainPhoto = photos[mainPhotoIndex];
    const onClickThumbnail = (e) => {
        const curSelect = `reg` + e.target.src.split("thumb")[1];
        regs.forEach((photo, index) => {
            if (photo.includes(curSelect)) setCurrImg(index);
        });
        setOpen(true);
    };
    return (
        <div>
            <CarContainer>
                <ImageMain img={mainPhoto} onClickThumbnail={onClickThumbnail} />
                <Info name={name} description={description} />
            </CarContainer>
            <ThumbsContainer>
                {thumbs.map((photo) => {
                    return (
                        <ImageThumb key={v4()} link_thumb={photo} onClick={onClickThumbnail}>
                            photo
                        </ImageThumb>
                    );
                })}
            </ThumbsContainer>
            <PhotoViewer photos={regs} onClickThumbnail={onClickThumbnail} currImg={currImg} open={open} setCurrImg={setCurrImg} setOpen={setOpen} />
        </div>
    );
};

const InventorySingle = ({ getOneInventory, loading, car_item, match }) => {
    useLayoutEffect(() => {
        getOneInventory(match.params.id);
    }, []);

    return (
        <Container>
            <Spinner shown={loading} />
            {!loading && <Car car_item={car_item} />}
        </Container>
    );
};

InventorySingle.propTypes = {
    getOneInventory: PropTypes.func.isRequired,
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
    getOneInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(InventorySingle);
