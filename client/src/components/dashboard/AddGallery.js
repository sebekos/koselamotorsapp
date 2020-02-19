import React, { useState, Fragment } from "react";
import { addGallery, setPhotoLoading, toggleAddGallery } from "../../Redux/actions/photo";
import { connect } from "react-redux";
import EditGalleryItem from "./EditGalleryItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const AddGallery = ({ addGallery, photo: { photos, loading, showAddGallery }, setPhotoLoading, toggleAddGallery }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const { name, description } = formData;

    const onClick = () => {
        toggleAddGallery(true);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const addGroup = async () => {
        setPhotoLoading();
        await addGallery(formData);
    };

    const onCancel = () => {
        toggleAddGallery(false);
    };

    return (
        <Fragment>
            {loading ? <Spinner /> : null}
            <div className="form">
                <div>
                    {!showAddGallery ? (
                        <button onClick={onClick} className="btn btn-success">
                            Add Gallery
                        </button>
                    ) : null}
                </div>
                {showAddGallery ? (
                    <div className="add-gallery">
                        <div className="add-gallery-inputs-container">
                            <input
                                name="name"
                                onChange={onChange}
                                type="text"
                                className="text"
                                placeholder="Gallery name..."
                                value={name}
                            />
                            <textarea
                                name="description"
                                placeholder="Description..."
                                onChange={onChange}
                                value={description}
                            ></textarea>
                        </div>
                        <div className="add-gallery-btn-container">
                            <button onClick={addGroup} className="btn btn-success">
                                Add
                            </button>
                            <button onClick={onCancel} className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : null}
                {photos.length > 0
                    ? photos.map((details, index) => {
                          return <EditGalleryItem key={"galitem-" + index} details={details} />;
                      })
                    : null}
            </div>
        </Fragment>
    );
};

AddGallery.propTypes = {
    addGallery: PropTypes.func.isRequired,
    setPhotoLoading: PropTypes.func.isRequired,
    toggleAddGallery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, {
    addGallery,
    setPhotoLoading,
    toggleAddGallery
})(AddGallery);
