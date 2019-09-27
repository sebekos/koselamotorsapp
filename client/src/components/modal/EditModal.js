import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeModal } from '../../Redux/actions/modal'

Modal.setAppElement(document.getElementById('root'))

const EditModal = ({ closeModal, isAuthenticated, modal: { modalIsOpen } }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        overlay: { zIndex: 10 }
    };

    const textBtn = () => {
        console.log(modalIsOpen);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <h2>Hello</h2>
            <button onClick={closeModal}>close</button>
            <button onClick={textBtn}>text</button>
            <div>I am a modal</div>
            <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
            </form>
        </Modal>
    )
}

EditModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    modal: state.modal
});

export default connect(mapStateToProps, { closeModal })(EditModal)
