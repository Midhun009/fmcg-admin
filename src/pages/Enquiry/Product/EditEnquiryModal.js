import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getProducts } from "./api"; // Assuming this is your API file

const EditEnquiryModal = ({ isVisible, onClose, onSave, selectedEnquiry }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "",
    product: "", // State for the selected product
  });

  const [products, setProducts] = useState([]); // State for available products

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // Fetch products from the API
      setProducts(response); // Assuming the response is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    // Populate form data when selectedEnquiry changes
    if (selectedEnquiry) {
      setFormData({
        name: selectedEnquiry.name || "",
        email: selectedEnquiry.email || "",
        mobile: selectedEnquiry.mobile || "",
        subject: selectedEnquiry.subject || "",
        message: selectedEnquiry.message || "",
        status: selectedEnquiry.status || "",
        product: selectedEnquiry.products || "", // Ensure this matches the product ID
      });
    }
  }, [selectedEnquiry]);

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
      onSave(formData);
    }
  };

  // Reset form when modal is closed
  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
      status: "",
      product: "", // Reset product selection
    });
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Products Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="product" className="form-label">
              Product
            </label>
            <select
              name="product"
              value={formData.product || ""} // Ensure this matches selected product
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
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

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Mobile Input */}
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Subject Input */}
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Status Select Dropdown */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              value={formData.status || ""} // Ensure this matches selected status
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
              <option value="DENIED">DENIED</option>
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

export default EditEnquiryModal;
