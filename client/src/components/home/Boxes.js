import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../Redux/actions/modal";
import PropTypes from "prop-types";

const Boxes = ({ isAuthenticated, openModal, text }) => {
    const editText = e => {
        if (!isAuthenticated) {
            return;
        }
        const data = {
            name: e.target.getAttribute("name"),
            text: e.target.textContent
        };
        openModal(data);
    };

    return (
        <section id="boxes">
            <div className="container">
                <div className="box">
                    <i className="fas fa-car-crash fa-4x"></i>
                    <h3 onClick={editText} name="servicetitle1">
                        {text.fields.servicetitle1}
                    </h3>
                    <p onClick={editText} name="box1">
                        {text.fields.box1}
                    </p>
                </div>
                <div className="box">
                    <i className="fas fa-tools fa-4x"></i>
                    <h3 onClick={editText} name="servicetitle2">
                        {text.fields.servicetitle2}
                    </h3>
                    <p onClick={editText} name="box2">
                        {text.fields.box2}
                    </p>
                </div>
                <div className="box">
                    <i className="fas fa-toolbox fa-4x"></i>
                    <h3 onClick={editText} name="servicetitle3">
                        {text.fields.servicetitle3}
                    </h3>
                    <p onClick={editText} name="box3">
                        {text.fields.box3}
                    </p>
                </div>
            </div>
        </section>
    );
};

Boxes.propTypes = {
    openModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    text: state.text
});

export default connect(mapStateToProps, { openModal })(Boxes);
