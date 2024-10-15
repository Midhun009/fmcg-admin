import React from "react";

const DetailModal = ({ enquiry, isVisible, onClose }) => {
  return (
    <div
      className={`modal fade ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderdetailsModalLabel"
      aria-hidden={!isVisible}
    >
      <div className="modal-dialog modal-dialog-centered">
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
            {/* Display enquiry details */}
            {/* ... */}
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
