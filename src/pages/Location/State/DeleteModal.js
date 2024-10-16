import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteCountryModal = ({
  isVisible,
  onClose,
  onDeleteCountry,
  selectedCountry,
}) => {
  const handleDelete = () => {
    onDeleteCountry(selectedCountry.id); // Call the delete function with selected country ID
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
        <p>Are you sure you want to delete this country?</p>
        <p>
          <strong>{selectedCountry?.name}</strong>{" "}
          {/* Display the country name */}
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

export default DeleteCountryModal;
