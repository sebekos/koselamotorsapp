import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import { connect } from 'react-redux'
import { getOneGallery } from '../../Redux/actions/photo'
import { galleryArray } from '../../utils/photo'
import PropTypes from 'prop-types'

const Gallery = ({ photo: { loading, oneGallery }, match, getOneGallery }) => {

    useEffect(() => {
        getOneGallery(match.params.id);
    }, [loading]);

    return (
        <section id='main'>
            <div className="container">
                {loading ? "Loading..." : <ImageGallery items={galleryArray(oneGallery.photos)} />}
            </div>
        </section>
    )
}

Gallery.propTypes = {
    getOneGallery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, { getOneGallery })(Gallery);
