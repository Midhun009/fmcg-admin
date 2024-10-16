import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCountries } from "./api"; // Import the API function to fetch countries

const EditStateModal = ({ isVisible, onClose, onSave, selectedState }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: null, // Initially null for country selection
  });
  const [countries, setCountries] = useState([]); // State to hold country options

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries(); // Fetch country data
        setCountries(data); // Set the fetched countries
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    if (isVisible) {
      fetchCountries(); // Fetch countries when the modal is visible
      if (selectedState) {
        setFormData({
          name: selectedState.name || "",
          country: selectedState.country || null, // Populate country from selected state
        });
      }
    }
  }, [isVisible, selectedState]);

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
      onSave({ ...selectedState, ...formData }); // Include id and other data in the update
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      country: null,
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit State</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* State Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              State Name
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

          {/* Country Selection */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}{" "}
                  {/* Adjust this to match your response structure */}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStateModal;
