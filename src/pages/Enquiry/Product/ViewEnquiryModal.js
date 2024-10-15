import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ViewEnquiryModal = ({ selectedEnquiry, isVisible, onClose }) => {
  if (!isVisible || !selectedEnquiry) return null;

  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enquiry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Enquiry Details */}
        <EnquiryDetail
          label="Product Name"
          value={selectedEnquiry.product_name}
        />
        <EnquiryDetail label="Person Name" value={selectedEnquiry.name} />
        <EnquiryDetail label="Email" value={selectedEnquiry.email} />
        <EnquiryDetail label="Mobile" value={selectedEnquiry.mobile} />
        <EnquiryDetail label="Subject" value={selectedEnquiry.subject} />
        <EnquiryDetail label="Message" value={selectedEnquiry.message} />
        <EnquiryDetail
          label="Status"
          value={
            <span
              className={`badge badge-soft-${
                selectedEnquiry.status.toLowerCase() === "approved"
                  ? "success"
                  : selectedEnquiry.status.toLowerCase() === "pending"
                  ? "warning"
                  : selectedEnquiry.status.toLowerCase() === "denied"
                  ? "danger"
                  : "secondary"
              }`}
            >
              {selectedEnquiry.status}
            </span>
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Reusable component for displaying enquiry details
const EnquiryDetail = ({ label, value }) => {
  return (
    <div className="mb-3">
      <h6 className="fw-bold">{label}:</h6>
      <p
        className={
          typeof value === "string" && value.includes("@")
            ? "text-secondary"
            : "text"
        }
      >
        {value}
      </p>
    </div>
  );
};

export default ViewEnquiryModal;
