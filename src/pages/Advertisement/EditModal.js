import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditAdModal = ({
  isVisible,
  onClose,
  onSave,
  selectedAd,
  organizations,
  packages,
}) => {
  const [formData, setFormData] = useState({
    link: "",
    start_date: "",
    end_date: "",
    status: "",
    organization: "",
    package: "",
    image: null, // Store the uploaded image file
  });

  useEffect(() => {
    if (selectedAd) {
      setFormData({
        link: selectedAd.link || "",
        start_date: selectedAd.start_date || "",
        end_date: selectedAd.end_date || "",
        status: selectedAd.status || "",
        organization: selectedAd.organization || "", // Use organization ID
        package: selectedAd.package || "", // Use package ID
        image: null, // Reset the image file on edit
      });
    }
  }, [selectedAd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Store the image data URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("link", formData.link);
    updatedData.append(
      "start_date",
      new Date(formData.start_date).toISOString()
    );
    updatedData.append("end_date", new Date(formData.end_date).toISOString());
    updatedData.append("status", formData.status);
    updatedData.append("organization", formData.organization);
    updatedData.append("package", formData.package);

    // Append the image file if it exists
    if (formData.image) {
      updatedData.append("image", formData.image); // Append the image file
    }

    onSave(updatedData); // Pass the FormData to onSave
  };

  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            {formData.image && (
              <p className="mt-2" style={{ fontSize: "0.8em" }}>
                Image URL:{" "}
                <a
                  href={formData.image} // Use the data URL for the link
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formData.image}
                </a>
              </p>
            )}
            {selectedAd && selectedAd.image && !formData.image && (
              <p className="mt-2" style={{ fontSize: "0.8em" }}>
                Current Image:{" "}
                <a
                  href={selectedAd.image} // Link to the existing image
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedAd.image}
                </a>
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Link</label>
            <input
              type="text"
              name="link"
              className="form-control"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={formData.start_date.split("T")[0] || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={formData.end_date.split("T")[0] || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="DENIED">Denied</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Organization</label>
            <select
              name="organization"
              className="form-select"
              value={formData.organization}
              onChange={handleChange}
              required
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Package</label>
            <select
              name="package"
              className="form-select"
              value={formData.package}
              onChange={handleChange}
              required
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
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

export default EditAdModal;
