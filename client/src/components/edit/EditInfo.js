import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { updateGalleryInfo } from "../../redux/actions/photo";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EditInfo = ({ match, photo: { photos, loading }, updateGalleryInfo }) => {
    useEffect(() => {
        if (!loading) {
            photos.forEach((detail) => {
                if (detail._id === match.params.id) {
                    setFormData({
                        ...formData,
                        name: detail.name,
                        description: detail.description,
                        id: detail._id
                    });
                }
            });
        }
    }, [loading, match.params.id]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        id: ""
    });

    const { name, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSave = () => {
        updateGalleryInfo(formData);
    };

    return (
        <div className="container">
            {!loading ? (
                <Fragment>
                    <div className="editinfo-container">
                        <div className="form">
                            <div className="form-group">
                                <input name="name" type="text" className="edit-title" value={name} onChange={onChange}></input>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    className="edit-description"
                                    value={description}
                                    onChange={onChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="edit-btn-container">
                        <button onClick={onSave} className="btn btn-success">
                            Save
                        </button>
                        <Link to="/dashboard" className="btn btn-primary">
                            Dashboard
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

EditInfo.propTypes = {
    updateGalleryInfo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    photo: state.photo
});

export default connect(mapStateToProps, { updateGalleryInfo })(EditInfo);
