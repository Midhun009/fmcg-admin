import React, { useState, useEffect } from "react";

const AddKeywordModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: null, // Initialize id as null if not auto-generated
    name: "",
    seo_title: "",
    seo_description: "",
    slug: "", // We'll generate this automatically
    section: "", // This will hold the selected section
  });

  useEffect(() => {
    if (isVisible) {
      setFormData({
        id: null, // Reset id to null
        name: "",
        seo_title: "",
        seo_description: "",
        slug: "", // Reset slug to empty
        section: "", // Reset section
      });
    }
  }, [isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prevData.slug, // Generate slug when name changes
    }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ""); // Remove invalid characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formData); // Pass form data to onAdd
    } catch (error) {
      console.error("Error adding keyword:", error);
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
            <h5 className="modal-title">Add Keyword</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Keyword</label>
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
                <label htmlFor="seo_title">SEO Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="seo_description">SEO Description</label>
                <textarea
                  name="seo_description"
                  value={formData.seo_description}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  readOnly // Make this read-only since it is auto-generated
                  className="form-control"
                />
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
                  <option value="Products">Products</option>
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

export default AddKeywordModal;
