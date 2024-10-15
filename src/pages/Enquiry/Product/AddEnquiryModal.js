import React, { useState } from "react";

const AddEnquiryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    productName: "",
    personName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Enquiry</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              {/* Form Fields */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <select
                  name="productName"
                  className="form-select"
                  required
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  <option value="coal">Coal</option>
                  <option value="lumber">Lumber</option>
                  <option value="steel">Steel</option>
                  <option value="cement">Cement</option>
                </select>
                <div className="invalid-feedback">
                  Please select a product name.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Person Name</label>
                <input
                  type="text"
                  name="personName"
                  className="form-control"
                  placeholder="Enter person's name"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Please enter a person's name.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Please enter a valid email.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter mobile number"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Please enter a mobile number.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Please enter a subject.</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Enter your message"
                  required
                  onChange={handleChange}
                ></textarea>
                <div className="invalid-feedback">Please enter a message.</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  required
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="denied">Denied</option>
                </select>
                <div className="invalid-feedback">Please select a status.</div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Add Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEnquiryModal;
