import React, { useState, useEffect } from "react";
import { getCountries } from "./api"; // Import getCountries

const AddStateModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "", // Initially set to an empty string
  });

  const [countries, setCountries] = useState([]); // State to hold countries

  useEffect(() => {
    if (isVisible) {
      setFormData({
        name: "",
        country: "", // Reset country
      });
      fetchCountries(); // Fetch countries when the modal is visible
    }
  }, [isVisible]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries(); // Fetch countries from your API
      setCountries(response); // Assuming the response is an array of countries
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formData); // Pass form data to onAdd
    } catch (error) {
      console.error("Error adding state:", error);
    }
  };

  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add State</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Country Dropdown */}
              <div className="form-group">
                <label htmlFor="country">Country</label>
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
                      {country.name} {/* Display the correct country name */}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Name Input */}
              <div className="form-group">
                <label htmlFor="name">State Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStateModal;
