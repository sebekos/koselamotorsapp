import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from './Sortable';
import Spinner from '../layout/Spinner';

const PhotoSortable = ({ photo: { photos, loading }, match }) => {
  const [sortphotos, setSortPhotos] = useState([]);

  useEffect(() => {
    let group =
      loading || !photos
        ? []
        : photos.filter(gallery => {
            return gallery._id === match.params.id;
          });
    setSortPhotos(loading || !photos ? [] : group[0].photos);
  }, [loading, match.params.id]);

  return (
    <div className='container'>
      {!loading && sortphotos.length > 0 ? (
        <Sortable importImages={sortphotos} gallery={match.params.id} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

PhotoSortable.propTypes = {
  photo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  null
)(PhotoSortable);
