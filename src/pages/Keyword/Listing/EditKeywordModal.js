import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditKeywordModal = ({
  isVisible,
  onClose,
  onSave,
  selectedKeyword, // Updated from selectedReview to selectedKeyword
}) => {
  const [formData, setFormData] = useState({
    name: "",
    seo_title: "",
    seo_description: "",
    slug: "", // Will be generated based on the name field
    section: "", // This will hold the selected section
  });

  useEffect(() => {
    // Populate form fields when the selectedKeyword changes and the modal becomes visible
    if (isVisible && selectedKeyword) {
      setFormData({
        name: selectedKeyword.name || "",
        seo_title: selectedKeyword.seo_title || "",
        seo_description: selectedKeyword.seo_description || "",
        slug: selectedKeyword.slug || "",
        section: selectedKeyword.section || "", // Populate section from selectedKeyword
      });
    }
  }, [isVisible, selectedKeyword]);

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
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      seo_title: "",
      seo_description: "",
      slug: "",
      section: "",
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Keyword</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Keyword
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

          {/* SEO Title Input */}
          <div className="mb-3">
            <label htmlFor="seo_title" className="form-label">
              SEO Title
            </label>
            <input
              type="text"
              name="seo_title"
              value={formData.seo_title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* SEO Description Textarea */}
          <div className="mb-3">
            <label htmlFor="seo_description" className="form-label">
              SEO Description
            </label>
            <textarea
              name="seo_description"
              value={formData.seo_description}
              onChange={handleChange}
              className="form-control"
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
              <option value="Products">Products</option>
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
