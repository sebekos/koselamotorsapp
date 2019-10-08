import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import { connect } from 'react-redux'

const Gallery = ({ photo: { photos } }) => {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        if (photos.length > 0) {
            const test = photos.map(photo => { return { original: photo, thumbnail: photo } });
            setGallery(test);
        }
    }, [photos]);

    return (
        <section id='main'>
            <div className="container">
                {photos.length === 0 ? "Loading..." : <ImageGallery items={gallery} />}
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    photo: state.photo
})

export default connect(mapStateToProps, null)(Gallery);
