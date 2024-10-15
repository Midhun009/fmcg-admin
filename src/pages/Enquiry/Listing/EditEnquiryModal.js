import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditEnquiryModal = ({
  isVisible,
  onClose,
  onSave,
  selectedEnquiry,
  organizations,
}) => {
  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    // Populate form data when selectedEnquiry changes
    if (selectedEnquiry) {
      setFormData({
        organization: selectedEnquiry.organization || "", // Handle missing organization
        name: selectedEnquiry.name || "",
        email: selectedEnquiry.email || "",
        mobile: selectedEnquiry.mobile || "",
        subject: selectedEnquiry.subject || "",
        message: selectedEnquiry.message || "",
        status: selectedEnquiry.status || "", // Ensure status is included
      });
    }
  }, [selectedEnquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  // Reset form when modal is closed
  const handleClose = () => {
    setFormData({
      organization: "",
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
      status: "",
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Organization Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="organization" className="form-label">
              Organization
            </label>
            <select
              name="organization"
              value={formData.organization || ""}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select organization
              </option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Mobile Input */}
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Subject Input */}
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Status Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
              <option value="DENIED">DENIED</option>
            </select>
          </div>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEnquiryModal;
