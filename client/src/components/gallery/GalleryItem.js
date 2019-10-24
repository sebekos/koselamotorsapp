import React from 'react'
import { Link } from 'react-router-dom'

const GalleryItem = ({ data }) => {
    return (
        <Link to={'/gallery/' + data._id}>
            <div className='gallery-item'>
                <div className="gallery-title">
                    {data.name}
                </div>
                <div className="gallery-img">
                    <img src={data.photos[0]} alt="Error" />
                </div>
            </div>
        </Link>
    )
}

export default GalleryItem
