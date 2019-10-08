import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import DeleteItem from './DeleteItem';
import { getPhotos } from '../../Redux/actions/photo'
import { connect } from 'react-redux'


const DeletePhotos = ({ getPhotos, photo: { photos, loading } }) => {
    const [delphotos, setDelphotos] = useState([]);

    useEffect(() => {
        getPhotos();
        setDelphotos(loading || !photos ? [] : photos);
    }, [loading]);

    const onDelete = e => {
        let newPhotos = [];
        let image = e.target.getAttribute('image');
        newPhotos = delphotos.filter(item => { return item !== image });
        setDelphotos(newPhotos);
    }

    const onSave = e => {
        e.preventDefault();
        console.log(delphotos);
        //reOrderPhotos(photos, match.params.id);
    }

    return (
        <div className="container">
            <div>
            </div>
            <div className='delete-container'>
                <button onClick={onSave} type='button' className='btn btn-success'>Save</button>

                {!loading ? delphotos.map((photo, index) => (<DeleteItem image={photo} ondelete={onDelete} key={index} />)) : "Loading..."}
            </div>
        </div>
    )
}

DeletePhotos.propTypes = ({
    getPhotos: PropTypes.func.isRequired
});

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, { getPhotos })(DeletePhotos)
