import React, { useState, Fragment } from "react";
import arrayMove from "array-move";
import ImgContainer from "./ImgContainer";
import { deletePhotos } from "../../redux/actions/photo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Sortable = ({ importImages, deletePhotos, gallery }) => {
    const [images, setImages] = useState(importImages);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setImages(arrayMove(images, oldIndex, newIndex));
    };

    const onSave = (e) => {
        e.preventDefault();
        const data = {
            photos: images,
            id: gallery
        };
        deletePhotos(data);
    };

    return (
        <Fragment>
            <div id="sortbtn">
                <button className="btn btn-success" onClick={onSave}>
                    Save
                </button>
                <Link className="btn btn-light my-1" to="/gallery">
                    Go To Gallery
                </Link>
            </div>
            <div className="sortable-container">
                <ImgContainer images={images} onSortEnd={(oldIndex, newIndex) => onSortEnd(oldIndex, newIndex)} />
            </div>
        </Fragment>
    );
};

Sortable.propTypes = {
    deletePhotos: PropTypes.func.isRequired
};

export default connect(null, { deletePhotos })(Sortable);
