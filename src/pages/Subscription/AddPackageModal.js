import React, { useState, useEffect } from "react";

const AddPackageModal = ({ isVisible, onClose, onAdd, organizations }) => {
  const [formData, setFormData] = useState({
    id: null, // Initialize id as null if not auto-generated
    name: "",
    price: "",
    features: "",
    section: "", // This will hold the selected section (e.g., Organization)
  });

  useEffect(() => {
    if (isVisible) {
      // Reset form data when modal becomes visible
      setFormData({
        id: null,
        name: "",
        price: "",
        features: "",
        section: "",
      });
    }
  }, [isVisible]);

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
      await onAdd(formData); // Pass form data to onAdd handler
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding package:", error);
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
            <h5 className="modal-title">Add Package</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Package Name</label>
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
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="features">Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="section">Section</label>
                <select
                  name="section"
                  value={formData.section || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select a section
                  </option>
                  <option value="Organization">Organization</option>
                  <option value="Advertisements">Advertisement</option>
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

export default AddPackageModal;
