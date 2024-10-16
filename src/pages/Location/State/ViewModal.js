import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewStateModal = ({ isVisible, onClose, selectedState }) => {
  if (!selectedState) return null; // Prevent rendering if no state is selected

  return (
    <Modal isOpen={isVisible} toggle={onClose}>
      <ModalHeader toggle={onClose}>View State</ModalHeader>
      <ModalBody>
        <p>
          <strong>ID:</strong> {selectedState.id}
        </p>
        <p>
          <strong>Country Name:</strong> {selectedState.country_name}{" "}
          {/* Assuming this field is available */}
        </p>
        <p>
          <strong>State Name:</strong> {selectedState.name}
        </p>
        <p>
          <strong>Created Date:</strong>{" "}
          {new Date(selectedState.created).toLocaleString()}
        </p>
        <p>
          <strong>Updated Date:</strong>{" "}
          {new Date(selectedState.updated).toLocaleString()}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewStateModal;
