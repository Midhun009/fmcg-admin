import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditCountryModal = ({ isVisible, onClose, onSave, selectedCountry }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    // Populate form fields when the selectedCountry changes and the modal becomes visible
    if (isVisible && selectedCountry) {
      setFormData({
        name: selectedCountry.name || "",
      });
    }
  }, [isVisible, selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...selectedCountry, name: formData.name }); // Include id in the update
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Country</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Country Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Country Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCountryModal;
