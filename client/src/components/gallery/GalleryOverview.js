import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPhotos } from "../../Redux/actions/photo";
import GalleryItem from "./GalleryItem";
import Spinner from "../layout/Spinner";

const GalleryOverview = ({ getPhotos, photo: { photos, loading } }) => {
    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <div className="gallery-overview container">
            {loading ? <Spinner /> : null}
            {photos.length > 0 ? (
                <Fragment>
                    {photos.map((item, index) => {
                        if (item.photos.length === 0) {
                            return null;
                        }
                        return <GalleryItem key={"gi-" + index} data={item} />;
                    })}
                </Fragment>
            ) : (
                <p>No Photos</p>
            )}
        </div>
    );
};

GalleryOverview.propTypes = {
    getPhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, { getPhotos })(GalleryOverview);
