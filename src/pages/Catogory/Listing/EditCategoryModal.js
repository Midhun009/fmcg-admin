import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditCategoryModal = ({
  isVisible,
  onClose,
  selectedCategory,
  onSave,
}) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
    slug: "",
    seo_title: "",
    seo_description: "",
    image_alt: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setCategoryData({
        name: selectedCategory.name || "",
        image: null, // Reset image since it won't be shown
        slug: selectedCategory.slug || "",
        seo_title: selectedCategory.seo_title || "",
        seo_description: selectedCategory.seo_description || "",
        image_alt: selectedCategory.image_alt || "",
      });
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setCategoryData((prev) => ({
      ...prev,
      image: e.target.files[0], // Capture the new image
    }));
  };

  const handleSave = () => {
    console.log("Saving category data:", categoryData); // Log the data to check
    onSave(categoryData); // Send updated category data
    onClose(); // Close the modal after saving
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label style={{ fontSize: ".8125rem" }}>
              Category Name
            </Form.Label>
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
            <Form.Label style={{ fontSize: ".8125rem" }}>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategorySlug">
            <Form.Label style={{ fontSize: ".8125rem" }}>Slug</Form.Label>
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
            <Form.Label style={{ fontSize: ".8125rem" }}>SEO Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter SEO title"
              name="seo_title"
              value={categoryData.seo_title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSeoDescription">
            <Form.Label style={{ fontSize: ".8125rem" }}>
              SEO Description
            </Form.Label>
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
            <Form.Label style={{ fontSize: ".8125rem" }}>
              Image Alt Text
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image alt text"
              name="image_alt"
              value={categoryData.image_alt}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;
