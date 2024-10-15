import React, { useState, useEffect } from "react";
import { getProducts, createEnquiry } from "./api"; // Ensure you're importing the correct API function

const AddEnquiryModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "PENDING", // Set a default status value
    products: "", // Initially empty string for product, changed from 'product'
  });

  const [products, setProducts] = useState([]); // State to hold products

  useEffect(() => {
    if (isVisible) {
      fetchProducts(); // Fetch products when the modal is visible
      // Reset form data when the modal opens
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        status: "PENDING",
        products: "", // Reset products
      });
    }
  }, [isVisible]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // Fetch products from the API
      setProducts(response); // Assuming the response is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
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
      // Modify the formData to ensure product ID is sent under 'products'
      const submissionData = {
        ...formData,
        products: formData.products, // Ensure products field is used here
      };

      await onAdd(submissionData); // Pass modified form data to onAdd
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding enquiry:", error);
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
            <h5 className="modal-title">Add Enquiry</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Product Selection */}
              <div className="form-group">
                <label htmlFor="products">Product</label>
                <select
                  name="products" // Ensure this matches the formData key
                  value={formData.products}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}{" "}
                      {/* Ensure this matches the API response structure */}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other form fields */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>
              {/* Status dropdown */}
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="DENIED">DENIED</option>
                </select>
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

export default AddEnquiryModal;
