import React, { Fragment, useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { resizeBulkArray } from '../../utils/photo';
import { uploadPhotos } from '../../Redux/actions/photo';

const AddPhotos = () => {
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
        const res = await resizeBulkArray(pictures);
        console.log(res);
    }
    return (
        <div className='container'>
            <div className="upload-images">
                <ImageUploader
                    withIcon={false}
                    buttonText='Choose images'
                    onChange={pictures => onDrop(pictures)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                    maxFileSize={10485760}
                    withPreview={true}
                />
                {uploadBtn ? <button onClick={onUpload}>
                    Upload images
                </button> : null}
            </div>
        </div>
    )
}

export default AddPhotos
