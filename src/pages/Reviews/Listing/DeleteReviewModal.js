import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteReviewModal = ({
  isVisible,
  onClose,
  onDeleteReview,
  selectedReview,
}) => {
  const handleDelete = () => {
    onDeleteReview(selectedReview.id); // Call the delete function with selected review ID
    onClose(); // Close the modal after the delete function is triggered
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
        <p>Are you sure you want to remove this review?</p>
        <p>
          <strong>{selectedReview?.subject}</strong>
        </p>
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

export default DeleteReviewModal;
