import React, { useState, Fragment } from 'react';
import { addGallery } from '../../Redux/actions/photo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditGalleryItem from './EditGalleryItem';

const AddGallery = ({ addGallery, photo: { photos } }) => {
  const [input, setInput] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const { name, description } = formData;

  const onClick = () => {
    setInput(!input);
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addGroup = async () => {
    await addGallery(formData);
    setInput(false);
  };

  const onCancel = () => {
    setInput(false);
  };

  return (
    <Fragment>
      <div className='form'>
        <div>
          {!input ? (
            <button onClick={onClick} className='btn btn-success'>
              Add Gallery
            </button>
          ) : null}
        </div>
        {input ? (
          <div className='add-gallery'>
            <div className='add-gallery-inputs-container'>
              <input
                name='name'
                onChange={onChange}
                type='text'
                className='text'
                placeholder='Gallery name...'
                value={name}
              />
              <textarea
                name='description'
                placeholder='Description...'
                onChange={onChange}
                value={description}
              ></textarea>
            </div>
            <div className='add-gallery-btn-container'>
              <button onClick={addGroup} className='btn btn-primary'>
                Add
              </button>
              <button onClick={onCancel} className='btn btn-danger'>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        {photos.length > 0
          ? photos.map((details, index) => {
              return (
                <EditGalleryItem key={'galitem-' + index} details={details} />
              );
            })
          : null}
      </div>
    </Fragment>
  );
};

AddGallery.propTypes = {
  addGallery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  { addGallery }
)(AddGallery);
