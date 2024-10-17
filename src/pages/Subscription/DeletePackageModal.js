import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeletePackageModal = ({
  isVisible,
  onClose,
  onDeletePackage, // Updated to onDeletePackage to reflect the package context
  selectedPackage, // Updated to selectedPackage
}) => {
  const handleDelete = () => {
    onDeletePackage(selectedPackage.id); // Call the delete function with selected package ID
    onClose(); // Close the modal after the delete function is triggered
  };

  return (
    <Modal
      show={isVisible}
      onHide={onClose}
      backdrop="static" // Prevent closing by clicking outside
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this package?</p>
        <p>
          <strong>{selectedPackage?.name}</strong>{" "}
          {/* Display the package name */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePackageModal;
