import React, { useState, useEffect } from "react";
import { getOrganizations, createEnquiry } from "./api"; // Import getOrganizations

const AddEnquiryModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "PENDING", // Set a default status value
    organization: null, // Initially null or set to a default value
  });

  const [organizations, setOrganizations] = useState([]); // State to hold organizations

  useEffect(() => {
    if (isVisible) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        status: "PENDING", // Reset status to default value
        organization: null, // Reset organization
      });
      fetchOrganizations(); // Fetch organizations when the modal is visible
    }
  }, [isVisible]);

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations();
      setOrganizations(response); // Assuming the response is an array of organizations
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formData); // Pass form data to onAdd
    } catch (error) {
      console.error("Error adding enquiry:", error);
    }
  };

  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Enquiry</h5>
            
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <select
                  name="organization"
                  value={formData.organization || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select an organization
                  </option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.company_name} {/* Use company_name here */}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other form fields */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>
              {/* Status dropdown */}
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="DENIED">DENIED</option>
                </select>
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEnquiryModal;
