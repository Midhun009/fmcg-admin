import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteAdModal = ({ isVisible, onClose, onDelete, adName }) => {
  const handleDelete = () => {
    onDelete(); 
    onClose();
  };

  return (
    <Modal
      show={isVisible}
      onHide={onClose}
      backdrop="static" // Prevent closing by clicking outside
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this advertisement?</p>
        {adName && (
          <p>
            <strong>Advertisement Link:</strong> {adName}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAdModal;
