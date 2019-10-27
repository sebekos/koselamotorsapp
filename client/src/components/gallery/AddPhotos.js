import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/photo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bulkResize } from '../../utils/photo';
import { getPhotos } from '../../Redux/actions/photo';

const AddPhotos = ({ uploadPhotos, getPhotos, photo, match }) => {
  const [pictures, setPictures] = useState([]);
  const [uploadBtn, setUploadBtn] = useState(false);

  useEffect(() => {
    getPhotos();
  }, []);

  const onDrop = picture => {
    setPictures(picture);
    if (picture.length > 0) {
      setUploadBtn(true);
    } else {
      setUploadBtn(false);
    }
  };

  const onUpload = async e => {
    let res = await bulkResize(pictures);
    let formData = new FormData();
    formData.append('group', match.params.id);
    res.map((photo, index) => {
      formData.append(`photo-${index}`, photo);
    });
    uploadPhotos(formData);
    // Promise.all(res.map(picture => {
    //     picture.append('group', match.params.id);
    //     return new Promise((resolve, reject) => resolve(uploadPhotos(picture)));
    // }))
    //     .then(results => {
    //         // setUploadBtn(false);
    //         // setPictures([]);
    //     });
  };

  return (
    <div className='container'>
      <div className='upload-images'>
        <ImageUploader
          withIcon={false}
          buttonText='Choose images'
          onChange={pictures => onDrop(pictures)}
          imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
          maxFileSize={30485760}
          withPreview={true}
        />
        {uploadBtn ? <button onClick={onUpload}>Upload images</button> : null}
      </div>
    </div>
  );
};

AddPhotos.propTypes = {
  uploadPhotos: PropTypes.func.isRequired,
  getPhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  { uploadPhotos, getPhotos }
)(AddPhotos);
