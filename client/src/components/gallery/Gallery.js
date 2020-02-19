import React, { useEffect, useState, Fragment } from "react";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import { galleryArray } from "../../utils/photo";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ photo: { photos, loading }, match }) => {
    const [curGallery, setCurGallery] = useState([]);
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);

    useEffect(() => {
        setGalleryUp();
    }, [loading, match.params.id]);

    const setGalleryUp = () => {
        photos.forEach(gallery => {
            if (gallery._id === match.params.id) {
                setCurGallery(galleryArray(gallery.photos));
                setName(gallery.name);
                setDescription(gallery.description);
            }
        });
    };

    return (
        <section id="main">
            <div className="container">
                <div className="gallery-component">
                    {loading || photos.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <Fragment>
                            <div className="gallery-component-title">{name}</div>
                            <div className="gallery-component-description">{description}</div>
                            <ImageGallery items={curGallery} />
                        </Fragment>
                    )}
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, null)(Gallery);
