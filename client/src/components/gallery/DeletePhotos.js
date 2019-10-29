import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteItem from './DeleteItem';
import { deletePhotos } from '../../Redux/actions/photo';
import { connect } from 'react-redux';

const DeletePhotos = ({ deletePhotos, photo: { photos, loading }, match }) => {
  const [delphotos, setDelphotos] = useState([]);

  useEffect(() => {
    let group =
      loading || !photos
        ? []
        : photos.filter(gallery => {
            return gallery._id === match.params.id;
          });
    setDelphotos(loading || !photos ? [] : group[0].photos);
  }, [loading, match.params.id]);

  const onDelete = e => {
    let newPhotos = [];
    let image = e.target.getAttribute('image');
    newPhotos = delphotos.filter(item => {
      return item !== image;
    });
    setDelphotos(newPhotos);
  };

  const onSave = e => {
    e.preventDefault();
    const data = {
      photos: delphotos,
      id: match.params.id
    };
    deletePhotos(data);
  };

  return (
    <div className='container'>
      <div></div>
      <div className='delete-container'>
        {!loading ? (
          <button onClick={onSave} type='button' className='btn btn-success'>
            Save
          </button>
        ) : null}
        {!loading
          ? delphotos.map((photo, index) => (
              <Fragment key={'deletefrag-' + index}>
                <DeleteItem
                  image={photo}
                  ondelete={onDelete}
                  key={'deletekey-' + index}
                />
              </Fragment>
            ))
          : 'Loading...'}
      </div>
    </div>
  );
};

DeletePhotos.propTypes = {
  deletePhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  { deletePhotos }
)(DeletePhotos);
