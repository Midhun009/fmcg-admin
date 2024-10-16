import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ViewReviewModal = ({ isVisible, onClose, selectedReview }) => {
  if (!selectedReview) return null; 

  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Review Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Subject: {selectedReview.subject}</h5>
        <p>
          <strong>Comment:</strong> {selectedReview.comment}
        </p>
        <p>
          <strong>Rating:</strong> {selectedReview.rating}/5
        </p>
        <p>
          <strong>Status:</strong> {selectedReview.status}
        </p>
        <p>
          <strong>Product:</strong> {selectedReview.product_name}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(selectedReview.created).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {new Date(selectedReview.updated).toLocaleString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewReviewModal;
