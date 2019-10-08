import React from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../Redux/actions/modal'
import PropTypes from 'prop-types'

const Showcase = ({ isAuthenticated, openModal, text }) => {

    const editText = e => {
        if (!isAuthenticated) {
            return;
        }
        const data = {
            name: e.target.getAttribute('name'),
            text: e.target.textContent
        }
        openModal(data);
    }

    return (
        <section id='showcase'>
            <div className="container showcase-content">
                <h1 onClick={editText} name='showcase'>{text.fields.showcase}</h1>
                <p onClick={editText} name='showcasedes'>{text.fields.showcasedes}</p>
            </div>
        </section>
    )
}

Showcase.propTypes = {
    openModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    text: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    text: state.text
});

export default connect(mapStateToProps, { openModal })(Showcase)
