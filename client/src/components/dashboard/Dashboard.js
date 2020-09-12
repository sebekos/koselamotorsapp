import React from "react";
import AddGallery from "./AddGallery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    padding: 6rem 0 0;
`;

const Dashboard = ({ photo }) => {
    return (
        <Container className="dashboard">
            <div className="container">
                <div className="instructions">
                    <h1>Photo Tools</h1>
                    <AddGallery />
                </div>
            </div>
        </Container>
    );
};

Dashboard.propTypes = {
    photo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    photo: state.photo
});

export default connect(mapStateToProps, null)(Dashboard);
