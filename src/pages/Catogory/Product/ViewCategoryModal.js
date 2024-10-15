import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewCategoryModal = ({ isVisible, onClose, selectedCategory }) => {
  if (!selectedCategory) return null;

  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col-4">Category Name:</div>
            <div className="col-8">
              <p className="text-primary" style={{ fontSize: ".8125rem" }}>
                {selectedCategory?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Category Image:</div>
            <div className="col-8">
              <img
                src={selectedCategory?.image || "placeholder-image-url.jpg"} // Replace with a placeholder URL if no image is available
                alt={selectedCategory.image_alt || "Category Image"}
                className="img-fluid"
                style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust image size here
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Slug:</div>
            <div className="col-8">
              <p className="text-primary" style={{ fontSize: ".8125rem" }}>
                {selectedCategory?.slug || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">SEO Title:</div>
            <div className="col-8">
              <p className="text-primary" style={{ fontSize: ".8125rem" }}>
                {selectedCategory?.seo_title || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Image Alt Text:</div>
            <div className="col-8">
              <p className="text-primary" style={{ fontSize: ".8125rem" }}>
                {selectedCategory?.image_alt || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Meta Description:</div>
            <div className="col-8">
              <p className="text-secondary" style={{ fontSize: ".8125rem" }}>
                {selectedCategory?.seo_description || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Created Date:</div>
            <div className="col-8">
              <p className="text-secondary" style={{ fontSize: ".8125rem" }}>
                {new Date(selectedCategory?.created).toLocaleString() || "N/A"}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">Updated Date:</div>
            <div className="col-8">
              <p className="text-secondary" style={{ fontSize: ".8125rem" }}>
                {new Date(selectedCategory?.updated).toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCategoryModal;
