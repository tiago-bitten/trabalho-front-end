import React from 'react';
import Button from './Button';
import Modal from './Modal';
import "../styles/ConfirmationModal.css";

const ConfirmationModal = ({ show, onClose, onConfirm, message, subMessage }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="confirmation-modal-content">
                <h2>{message}</h2>
                <p>{subMessage}</p>
                <div className="modal-actions">
                    <Button type="button" onClick={onConfirm}>Sim</Button>
                    <Button type="button" onClick={onClose}>Não</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
