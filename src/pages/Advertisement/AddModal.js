import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrganizations, getPackages } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

const AddAdModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    image: null, // Changed to handle file upload
    link: "",
    start_date: "",
    end_date: "",
    status: "APPROVED", // Default status
    organization: "",
    package: "",
  });

  const [organizations, setOrganizations] = useState([]); // For organization dropdown
  const [packages, setPackages] = useState([]); // For package dropdown

  const imageInputRef = useRef(null); // Reference for image input

  useEffect(() => {
    if (isVisible) {
      // Fetch organizations and packages when modal opens
      fetchOrganizations();
      fetchPackages();
      resetForm();
    }
  }, [isVisible]);

  const fetchOrganizations = async () => {
    const orgs = await getOrganizations();
    setOrganizations(orgs);
  };

  const fetchPackages = async () => {
    const pks = await getPackages();
    setPackages(pks);
  };

  const resetForm = () => {
    setFormData({
      image: null,
      link: "",
      start_date: "",
      end_date: "",
      status: "APPROVED",
      organization: "",
      package: "",
    });

    // Clear the file input field
    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // New handler for image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store the file itself
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the API expects a FormData object
    const submissionData = new FormData();
    submissionData.append("image", formData.image);
    submissionData.append("link", formData.link);
    submissionData.append("start_date", formData.start_date);
    submissionData.append("end_date", formData.end_date);
    submissionData.append("status", formData.status);
    submissionData.append("organization", formData.organization);
    submissionData.append("package", formData.package);

    onAdd(submissionData); // Pass the FormData to the parent

    // Reset the form after submitting
    resetForm();
  };

  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Advertisement</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-body">
              {/* Image Upload Field */}
              <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                  className="form-control"
                  accept="image/*"
                  required
                  ref={imageInputRef} // Attach the ref to the input
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DENIED">DENIED</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select Organization
                  </option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.company_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="package">Package</label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select Package
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
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

export default AddAdModal;
