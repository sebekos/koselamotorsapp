import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

const EditInfo = ({ match, photo: { photos, loading } }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!loading) {
      photos.forEach(detail => {
        if (detail._id === match.params.id) {
          setDetails(detail);
        }
      });
    }
  }, [loading, match.params.id]);

  return (
    <div className='container'>
      {details ? (
        <Fragment>
          <div className='editinfo-container'>
            {details.name}
            {details.description}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  null
)(EditInfo);
