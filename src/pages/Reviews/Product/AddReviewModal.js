import React, { useState, useEffect } from "react";
import { fetchProducts } from "./api"; // Update the import for fetching products

const AddReviewModal = ({ isVisible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    rating: null, // Initialize rating as null
    subject: "", // Use subject instead of title
    comment: "",
    status: null, // Initialize status as null
    productId: null, // Initialize product ID
  });

  const [products, setProducts] = useState([]); // State to hold products

  useEffect(() => {
    if (isVisible) {
      setFormData({
        rating: null, // Reset rating to null
        subject: "", // Reset subject for the review
        comment: "",
        status: null, // Reset status
        productId: null, // Reset product ID
      });
      fetchProductsList(); // Fetch products when the modal is visible
    }
  }, [isVisible]);

  const fetchProductsList = async () => {
    try {
      const response = await fetchProducts();
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

  const handleProductChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      productId: e.target.value, // Save product ID instead of name
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data to submit
    const dataToSubmit = {
      products: formData.productId, // Use products for submission with the productId
      rating: formData.rating,
      subject: formData.subject,
      comment: formData.comment,
      status: formData.status,
    };

    console.log("Submitting form data:", dataToSubmit); // Log the structured form data before submitting

    try {
      await onAdd(dataToSubmit); // Pass structured data to onAdd
    } catch (error) {
      console.error("Error adding review:", error);
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
            <h5 className="modal-title">Add Review</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="productId">Product</label>
                <select
                  name="productId" // Update to productId
                  value={formData.productId || ""}
                  onChange={handleProductChange} // Use the new handler
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} {/* Use product name here */}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select
                  name="rating"
                  value={formData.rating || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select a rating
                  </option>
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
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
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select status
                  </option>
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

export default AddReviewModal;
