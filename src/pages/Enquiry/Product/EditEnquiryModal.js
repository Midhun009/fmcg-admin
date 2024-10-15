import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditEnquiryModal = ({ isOpen, onClose, enquiry, onEditEnquiry }) => {
  const [formData, setFormData] = useState({
    productName: "",
    personName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    if (enquiry) {
      setFormData(enquiry);
    }
  }, [enquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditEnquiry(formData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          autoComplete="off"
          className="needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="editProductNameField" className="form-label">
              Product Name
            </label>
            <select
              id="editProductNameField"
              className="form-select"
              name="productName"
              value={formData.productName || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a product
              </option>
              <option value="coal">Coal</option>
              <option value="lumber">Lumber</option>
              <option value="steel">Steel</option>
              <option value="cement">Cement</option>
              {/* Add more products as needed */}
            </select>
            <div className="invalid-feedback">
              Please select a product name.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="editPersonNameField" className="form-label">
              Person Name
            </label>
            <input
              type="text"
              id="editPersonNameField"
              className="form-control"
              name="personName"
              placeholder="Enter person's name"
              value={formData.personName || ""}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a person's name.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="editEmailField" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="editEmailField"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="editMobileField" className="form-label">
              Mobile
            </label>
            <input
              type="tel"
              id="editMobileField"
              className="form-control"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile || ""}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a mobile number.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="editSubjectField" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="editSubjectField"
              className="form-control"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject || ""}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a subject.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="editMessageField" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="editMessageField"
              rows="5"
              name="message"
              placeholder="Enter your message"
              value={formData.message || ""}
              onChange={handleChange}
              required
            ></textarea>
            <div className="invalid-feedback">Please enter a message.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="editStatusField" className="form-label">
              Status
            </label>
            <select
              id="editStatusField"
              className="form-select"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              required
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" type="submit" form="editEnquiryForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEnquiryModal;
