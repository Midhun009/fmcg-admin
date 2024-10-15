import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategoryModal = ({ isVisible, onClose, onAddCategory }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
    slug: "",
    seo_title: "",
    seo_description: "",
    image_alt: "",
  });

  useEffect(() => {
    if (isVisible) {
      // Reset the form when the modal is opened
      setCategoryData({
        name: "",
        image: null,
        slug: "",
        seo_title: "",
        seo_description: "",
        image_alt: "",
      });
    }
  }, [isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));

    // Automatically generate slug when the name changes
    if (name === "name") {
      const generatedSlug = generateSlug(value);
      setCategoryData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleImageChange = (e) => {
    setCategoryData((prev) => ({
      ...prev,
      image: e.target.files[0], // Store the uploaded file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send as multipart/form-data
    const formData = new FormData();
    Object.entries(categoryData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    onAddCategory(formData);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
      .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategoryImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategorySlug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              placeholder="Generated slug"
              name="slug"
              value={categoryData.slug}
              onChange={handleChange}
              readOnly // Make slug read-only to prevent manual changes
            />
          </Form.Group>

          <Form.Group controlId="formSeoTitle">
            <Form.Label>SEO Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter SEO title"
              name="seo_title"
              value={categoryData.seo_title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSeoDescription">
            <Form.Label>SEO Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter SEO description"
              name="seo_description"
              value={categoryData.seo_description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formImageAlt">
            <Form.Label>Image Alt Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image alt text"
              name="image_alt"
              value={categoryData.image_alt}
              onChange={handleChange}
            />
          </Form.Group>

          <br />
          <Button variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
