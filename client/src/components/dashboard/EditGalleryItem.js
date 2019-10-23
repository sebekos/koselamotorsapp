import React from 'react'
import { Link } from 'react-router-dom'

const EditGalleryItem = ({ details }) => {
    return (
        <div className="form edit-gallery-item">
            <div>
                <p>{details.name}</p>
            </div>
            <div>
                <Link to={'/addphotos/' + details._id} className="btn btn-success">Add Photos</Link>
            </div>
            <div>
                <Link to={'/reorderphotos/' + details._id} className="btn btn-primary">Reorder Photos</Link>
            </div>
            <div>
                <Link to={'/deletephotos/' + details._id} className="btn btn-danger">Delete Photos</Link>
            </div>
        </div>
    )
}

export default EditGalleryItem
