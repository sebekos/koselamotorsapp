import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import {
    uploadPhotos,
    setPhotoLoading,
    getPhotos
} from '../../Redux/actions/photo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bulkResize } from '../../utils/photo';
import Spinner from '../layout/Spinner';
import ProgressBar from '../layout/ProgressBar';

const AddPhotos = ({
    uploadPhotos,
    setPhotoLoading,
    getPhotos,
    match,
    photo
}) => {
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
        setPhotoLoading();
        setUploadBtn(false);
        let res = await bulkResize(pictures);
        let formData = new FormData();
        formData.append('group', match.params.id);
        res.map((photo, index) => {
            formData.append(`photo-${index}`, photo);
        });
        await uploadPhotos(formData);
        setUploadBtn(true);
    };

    return (
        <div className='container'>
            {photo.loading ? <Spinner /> : null}
            <div className='upload-images'>
                <ImageUploader
                    withIcon={false}
                    buttonText='Choose images'
                    onChange={pictures => onDrop(pictures)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                    maxFileSize={30485760}
                    withPreview={true}
                />
                {uploadBtn ? (
                    <button className='btn btn-success' onClick={onUpload}>
                        Upload images
                    </button>
                ) : null}
                <ProgressBar />
            </div>
        </div>
    );
};

AddPhotos.propTypes = {
    uploadPhotos: PropTypes.func.isRequired,
    getPhotos: PropTypes.func.isRequired,
    setPhotoLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(
    mapStateToProps,
    { uploadPhotos, getPhotos, setPhotoLoading }
)(AddPhotos);
