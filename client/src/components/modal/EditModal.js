import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeModal } from "../../redux/actions/modal";
import { updateText } from "../../redux/actions/text";

Modal.setAppElement(document.getElementById("root"));

const EditModal = ({ closeModal, modal: { modalIsOpen, text, name }, updateText }) => {
    const [formText, setFormText] = useState(text);

    const onChangeHandler = (e) => setFormText(e.target.value);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "fit-content"
        },
        overlay: { zIndex: 10 }
    };

    const onSave = (e) => {
        e.preventDefault();
        let form = {
            name: name,
            text: formText === "" ? text : formText
        };
        updateText(form);
        console.log(form);
    };

    const onClose = () => {
        closeModal();
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <h2>{name}</h2>
            <form className="form edit-modal-form">
                <div className="form-group">
                    <textarea name="formText" onChange={onChangeHandler} defaultValue={text}></textarea>
                </div>
                <div className="form-group edit-modal-buttons">
                    <button onClick={onSave} className="btn btn-success">
                        Save
                    </button>
                    <button onClick={onClose} className="btn btn-primary">
                        Close
                    </button>
                </div>
            </form>
        </Modal>
    );
};

EditModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    updateText: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    modal: state.modal
});

export default connect(mapStateToProps, { closeModal, updateText })(EditModal);
