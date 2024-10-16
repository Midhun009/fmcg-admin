import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ViewReviewModal = ({ isVisible, onClose, selectedReview }) => {
  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Review Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedReview ? (
          <div>
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
              <strong>Created:</strong>{" "}
              {new Date(selectedReview.created).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(selectedReview.updated).toLocaleString()}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedReview.company_name}
            </p>
          </div>
        ) : (
          <p>No review selected.</p>
        )}
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
