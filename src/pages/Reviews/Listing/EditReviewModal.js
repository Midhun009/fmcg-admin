import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditReviewModal = ({
  isVisible,
  onClose,
  onSave,
  selectedReview,
  organizations,
}) => {
  const [formData, setFormData] = useState({
    organization: "",
    rating: null,
    subject: "",
    comment: "",
    status: "",
  });

  useEffect(() => {
    // Populate form fields as soon as the selectedReview changes and the modal becomes visible
    if (isVisible && selectedReview) {
      setFormData({
        organization: selectedReview.organization || "",
        rating: selectedReview.rating || null,
        subject: selectedReview.subject || "",
        comment: selectedReview.comment || "",
        status: selectedReview.status || "",
      });
    }
  }, [isVisible, selectedReview]);

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

  const handleClose = () => {
    setFormData({
      organization: "",
      rating: null,
      subject: "",
      comment: "",
      status: "",
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
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

          {/* Rating Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <select
              name="rating"
              value={formData.rating || ""}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select rating
              </option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
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

          {/* Comment Textarea */}
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              name="comment"
              value={formData.comment}
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

export default EditReviewModal;
