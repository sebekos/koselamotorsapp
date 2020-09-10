import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openModal } from "../../redux/actions/modal";

const About = ({ isAuthenticated, openModal, text }) => {
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
        <section id="main">
            <div className="container">
                <article id="main-col">
                    <h1 onClick={editText} name="abouttitle" className="page-title">
                        {text.fields.abouttitle}
                    </h1>
                    <p onClick={editText} name="about">
                        {text.fields.about}
                    </p>
                </article>
                <aside id="sidebar">
                    <div className="dark">
                        <h3 onClick={editText} name="whatwedotitle">
                            {text.fields.whatwedotitle}
                        </h3>
                        <p onClick={editText} name="whatwedo">
                            {text.fields.whatwedo}
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

About.propTypes = {
    openModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    text: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    text: state.text
});

export default connect(mapStateToProps, { openModal })(About);
