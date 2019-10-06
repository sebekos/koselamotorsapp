import React, { Fragment, useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/photo';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bulkResize } from '../../utils/photo'


const AddPhotos = ({ uploadPhotos, photo }) => {
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);

    const onDrop = picture => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
        } else {
            setUploadBtn(false);
        }
    }

    const onUpload = async e => {
        let res = await bulkResize(pictures);
        Promise.all(res.map(picture => {
            return new Promise((resolve, reject) => resolve(uploadPhotos(picture)));
        }))
            .then(results => {
                setUploadBtn(false);
                setPictures([]);
            });
    }

    return (
        <div className='container'>
            <div className="upload-images">
                <ImageUploader
                    withIcon={false}
                    buttonText='Choose images'
                    onChange={pictures => onDrop(pictures)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                    maxFileSize={30485760}
                    withPreview={true}
                />
                {uploadBtn ? <button onClick={onUpload}>
                    Upload images
                </button> : null}
            </div>
        </div>
    )
}

AddPhotos.propTypes = {
    uploadPhotos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, { uploadPhotos })(AddPhotos)
