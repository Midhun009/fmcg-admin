import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewPackageModal = ({ isVisible, onClose, selectedPackage }) => {
  if (!selectedPackage) return null; // Prevent rendering if no package is selected

  return (
    <Modal isOpen={isVisible} toggle={onClose}>
      <ModalHeader toggle={onClose}>View Package</ModalHeader>
      <ModalBody>
        <p>
          <strong>Package Name:</strong> {selectedPackage.name}
        </p>
        <p>
          <strong>Price:</strong> {selectedPackage.price}
        </p>
        <p>
          <strong>Features:</strong>{" "}
          <span
            dangerouslySetInnerHTML={{ __html: selectedPackage.features }}
          />
        </p>
        
        <p>
          <strong>Section:</strong> {selectedPackage.section}
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

export default ViewPackageModal;
