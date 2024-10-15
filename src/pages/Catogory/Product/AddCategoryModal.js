// AddCategoryModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const AddCategoryModal = ({ isVisible, onClose, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    seo_title: "",
    seo_description: "",
    image: null,
    image_alt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewCategory((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name) {
      toast.error("Category name is required.");
      return;
    }
    onAddCategory(newCategory);
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Slug</label>
            <input
              type="text"
              className="form-control"
              name="slug"
              value={newCategory.slug}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">SEO Title</label>
            <input
              type="text"
              className="form-control"
              name="seo_title"
              value={newCategory.seo_title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">SEO Description</label>
            <textarea
              className="form-control"
              name="seo_description"
              value={newCategory.seo_description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image Alt Text</label>
            <input
              type="text"
              className="form-control"
              name="image_alt"
              value={newCategory.image_alt}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
