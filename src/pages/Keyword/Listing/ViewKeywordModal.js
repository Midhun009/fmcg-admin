import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewKeywordModal = ({ isVisible, onClose, selectedKeyword }) => {
  if (!selectedKeyword) return null; // Prevent rendering if no keyword is selected

  return (
    <Modal isOpen={isVisible} toggle={onClose}>
      <ModalHeader toggle={onClose}>View Keyword</ModalHeader>
      <ModalBody>
        <p>
          <strong>Keyword:</strong> {selectedKeyword.name}
        </p>
        <p>
          <strong>SEO Title:</strong> {selectedKeyword.seo_title}
        </p>
        <p>
          <strong>SEO Description:</strong> {selectedKeyword.seo_description}
        </p>
        <p>
          <strong>Slug:</strong> {selectedKeyword.slug}
        </p>
        <p>
          <strong>Section:</strong> {selectedKeyword.section}
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

export default ViewKeywordModal;
