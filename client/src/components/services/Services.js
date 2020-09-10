import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../redux/actions/modal";
import PropTypes from "prop-types";

const Services = ({ isAuthenticated, openModal, text }) => {
    const editText = (e) => {
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
        <section id="services">
            <div className="container">
                <div className="services-container">
                    <div className="servicebox">
                        <div className="service-icon">
                            <i className="fas fa-car-crash fa-7x"></i>
                        </div>
                        <div className="service-description">
                            <h3 onClick={editText} name="servicetitle1">
                                {text.fields.servicetitle1}
                            </h3>
                            <p onClick={editText} name="service1">
                                {text.fields.service1}
                            </p>
                        </div>
                    </div>
                    <div className="servicebox">
                        <div className="service-icon">
                            <i className="fas fa-tools fa-7x"></i>
                        </div>
                        <div className="service-description">
                            <h3 onClick={editText} name="servicetitle2">
                                {text.fields.servicetitle2}
                            </h3>
                            <p onClick={editText} name="service2">
                                {text.fields.service2}
                            </p>
                        </div>
                    </div>
                    <div className="servicebox">
                        <div className="service-icon">
                            <i className="fas fa-toolbox fa-7x"></i>
                        </div>
                        <div className="service-description">
                            <h3 onClick={editText} name="servicetitle3">
                                {text.fields.servicetitle3}
                            </h3>
                            <p onClick={editText} name="service3">
                                {text.fields.service3}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Services.propTypes = {
    openModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    text: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    text: state.text
});

export default connect(mapStateToProps, { openModal })(Services);
