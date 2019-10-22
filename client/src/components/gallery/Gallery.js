import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { connect } from 'react-redux'
import { galleryArray } from '../../utils/photo'
import "react-image-gallery/styles/css/image-gallery.css"

const Gallery = ({ photo: { photos, loading }, match }) => {
    const [curGallery, setCurGallery] = useState([]);

    useEffect(() => {
        setGalleryUp();
    }, [match.params.id]);

    const setGalleryUp = () => {
        photos.forEach(gallery => {
            if (gallery._id === match.params.id) {
                setCurGallery(galleryArray(gallery.photos));
            }
        })
    }

    return (
        <section id='main'>
            <div className="container">
                {loading ? <p>Loading...</p> : <ImageGallery items={curGallery} />}
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, null)(Gallery);
