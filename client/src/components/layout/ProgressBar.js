import React from "react";
import { connect } from "react-redux";

const ProgressBar = ({ photo: { progressbarvalue, progressbar } }) => {
    return (
        <div className="progressbar">
            {progressbar ? <progress value={progressbarvalue} max="100"></progress> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, null)(ProgressBar);
