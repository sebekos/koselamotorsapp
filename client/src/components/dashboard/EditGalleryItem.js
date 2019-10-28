import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGallery } from '../../Redux/actions/photo';
import PropTypes from 'prop-types';

const EditGalleryItem = ({ details, deleteGallery }) => {
  const onDelete = galleryid => {
    deleteGallery(galleryid);
  };

  return (
    <div className='form edit-gallery-item'>
      <div>
        <p>{details.name}</p>
      </div>
      <div className='edit-gallery-item-buttons'>
        <div>
          <Link to={'/addphotos/' + details._id} className='btn btn-success'>
            Add Photos
          </Link>
        </div>
        <div>
          <Link
            to={'/reorderphotos/' + details._id}
            className='btn btn-primary'
          >
            Reorder Photos
          </Link>
        </div>
        <div>
          <Link to={'/deletephotos/' + details._id} className='btn btn-danger'>
            Delete Photos
          </Link>
        </div>
        <div>
          <button
            onClick={() => onDelete(details._id)}
            className='btn btn-danger'
          >
            Delete Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

EditGalleryItem.propTypes = {
  deleteGallery: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteGallery }
)(EditGalleryItem);
