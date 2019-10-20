import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPhotos } from '../../Redux/actions/photo'
import GalleryItem from './GalleryItem'


const GalleryOverview = ({ getPhotos, photo: { photos } }) => {
    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <div className='gallery-overview container'>
            {photos.length > 0 ? (
                <Fragment>
                    {photos.map((item, index) => {
                        return <GalleryItem key={'gi-' + index} data={item} />
                    })}
                </Fragment>
            ) : <p>No Photos</p>}
        </div>
    )
}

GalleryOverview.propTypes = {
    getPhotos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    photo: state.photo
})

export default connect(mapStateToProps, { getPhotos })(GalleryOverview)
