import React, { useState, useEffect } from "react";

const AddCountryModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "", // Only 'name' is required for the user input
  });

  useEffect(() => {
    if (isVisible) {
      setFormData({
        name: "", // Reset name
      });
    }
  }, [isVisible]);

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
      // Include 'created' and 'updated' dates in the country object automatically
      const countryData = {
        ...formData,
        created: new Date().toISOString(), // Set created date to now
        updated: new Date().toISOString(), // Set updated date to now
      };
      await onAdd(countryData); // Pass the constructed country object to onAdd
    } catch (error) {
      console.error("Error adding country:", error);
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
            <h5 className="modal-title">Add Country</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Country Name</label>
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

export default AddCountryModal;
