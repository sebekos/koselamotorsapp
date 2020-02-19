import React from "react";
import EditModal from "../modal/EditModal";
import AddGallery from "./AddGallery";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ photo }) => {
    return (
        <section className="dashboard">
            <div className="container">
                {photo.loading ? <Spinner /> : null}
                <div className="instructions">
                    <h1>Edit Text</h1>
                    <p>Go to any page, double click on any text box then save.</p>
                </div>
                <div className="instructions">
                    <h1>Photo Tools</h1>
                    <AddGallery />
                </div>
                <EditModal />
            </div>
        </section>
    );
};

Dashboard.propTypes = {
    photo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    photo: state.photo
});

export default connect(mapStateToProps, null)(Dashboard);
