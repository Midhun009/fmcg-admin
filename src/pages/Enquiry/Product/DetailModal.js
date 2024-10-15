// DetailModal.js
import React from "react";

const DetailModal = ({ enquiry, isOpen, onClose }) => {
  return (
    <div
      className={`modal fade orderdetailsModal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderdetailsModalLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderdetailsModalLabel">
              Enquiry Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <h6 className="fw-bold">ID:</h6>
              <p className="text-primary">{enquiry.id}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Product Name:</h6>
              <p className="text-primary">{enquiry.productName}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Person Name:</h6>
              <p className="text">{enquiry.personName}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Email:</h6>
              <p className="text-secondary">{enquiry.email}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Mobile:</h6>
              <p className="text-secondary">{enquiry.mobile}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Subject:</h6>
              <p className="text-secondary">{enquiry.subject}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Message:</h6>
              <p className="text-secondary">{enquiry.message}</p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold">Status:</h6>
              <p>
                <span
                  className={`badge ${
                    enquiry.status.toLowerCase() === "approved"
                      ? "badge-soft-success"
                      : enquiry.status.toLowerCase() === "pending"
                      ? "badge-soft-warning"
                      : enquiry.status.toLowerCase() === "denied"
                      ? "badge-soft-danger"
                      : ""
                  }`}
                >
                  {enquiry.status}
                </span>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
