import React from "react";

const DeleteCategoryModal = ({ isVisible, onClose, onDeleteCategory, selectedCategory }) => {
  return (
    <div
      className={`modal fade ${isVisible ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: isVisible ? "rgba(0, 0, 0, 0.5)" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Category</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDeleteCategory(selectedCategory.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
