import React, { Fragment, useState } from "react";
import ImgsViewer from "react-images-viewer";
import PropTypes from "prop-types";

const PhotoViewer = ({ photos, onClickThumbnail, currImg, open, setCurrImg, setOpen }) => {
    const onNextImg = () => {
        setCurrImg(currImg + 1);
    };

    const onPrevImg = () => {
        setCurrImg(currImg - 1);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <ImgsViewer
                backdropCloseable={true}
                currImg={currImg}
                imgs={photos.map((photo) => {
                    return { src: photo };
                })}
                isOpen={open}
                onClickPrev={onPrevImg}
                onClickNext={onNextImg}
                onClose={onClose}
                showThumbnails={true}
                onClickThumbnail={onClickThumbnail}
            />
        </Fragment>
    );
};

PhotoViewer.propTypes = {
    photos: PropTypes.array
};

export default PhotoViewer;
