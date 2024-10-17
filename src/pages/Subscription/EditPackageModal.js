import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditKeywordModal = ({
  isVisible,
  onClose,
  onSave,
  selectedPackage, // Updated from selectedKeyword to selectedPackage
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "", // New price field
    features: "", // New features field
    slug: "", // Will be generated based on the name field
    section: "", // This will hold the selected section
  });

  useEffect(() => {
    // Populate form fields when the selectedPackage changes and the modal becomes visible
    if (isVisible && selectedPackage) {
      setFormData({
        name: selectedPackage.name || "",
        price: selectedPackage.price || "",
        features: selectedPackage.features || "",
        slug: generateSlug(selectedPackage.name), // Generate slug based on the name
        section: selectedPackage.section || "", // Populate section from selectedPackage
      });
    }
  }, [isVisible, selectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Generate slug when the name changes
      slug: name === "name" ? generateSlug(value) : prevData.slug,
    }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ""); // Remove invalid characters
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData); // Save the changes
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "", // Reset the price field
      features: "", // Reset the features field
      slug: "",
      section: "",
    });
    onClose(); // Close the modal
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Package Name
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

          {/* Price Input */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Features Textarea */}
          <div className="mb-3">
            <label htmlFor="features" className="form-label">
              Features
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="form-control"
              rows="5" // Set the number of rows for better visibility
              required
            />
          </div>

          {/* Slug Input */}
          <div className="mb-3">
            <label htmlFor="slug" className="form-label">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              readOnly // Make this read-only since it is auto-generated
              className="form-control"
            />
          </div>

          {/* Section Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="section" className="form-label">
              Section
            </label>
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
              <option value="Advertisements">Advertisements</option>
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

export default EditKeywordModal;
