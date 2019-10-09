import React, { useEffect, useState } from 'react'
import { getPhotos } from '../../Redux/actions/photo'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Sortable from './Sortable'

const PhotoSortable = ({ getPhotos, photo: { photos, loading } }) => {
    const [sortphotos, setSortPhotos] = useState([]);

    useEffect(() => {
        getPhotos();
        setSortPhotos(loading || !photos ? [] : photos);
    }, [photos]);

    return (
        <div className="container">
            {!loading && sortphotos.length > 0 ? <Sortable importImages={sortphotos} /> : "Loading..."}
        </div>
    )
}

PhotoSortable.propTypes = ({
    getPhotos: PropTypes.func.isRequired,
    photo: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    photo: state.photo
})

export default connect(mapStateToProps, { getPhotos })(PhotoSortable);
