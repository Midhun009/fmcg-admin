import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewCountryModal = ({ isVisible, onClose, selectedCountry }) => {
  if (!selectedCountry) return null; // Prevent rendering if no country is selected

  return (
    <Modal isOpen={isVisible} toggle={onClose}>
      <ModalHeader toggle={onClose}>View Country</ModalHeader>
      <ModalBody>
        <p>
          <strong>Country Name:</strong> {selectedCountry.name}
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

export default ViewCountryModal;
