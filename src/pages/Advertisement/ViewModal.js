import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

const ViewAdModal = ({ isVisible, onClose, ad }) => {
  if (!ad) return null; // Prevent rendering if no ad is selected

  return (
    <Modal isOpen={isVisible} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>View Advertisement</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <p>
              <strong>ID:</strong> {ad.id}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                {ad.link}
              </a>
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(ad.start_date).toLocaleString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(ad.end_date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {ad.status}
            </p>
            <p>
              <strong>Organization:</strong> {ad.organization_name}
            </p>
            <p>
              <strong>Package:</strong> {ad.package_name}
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={ad.image} // Display the advertisement image
              alt="Advertisement"
              style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} // Set maxHeight and objectFit for better display
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewAdModal;
