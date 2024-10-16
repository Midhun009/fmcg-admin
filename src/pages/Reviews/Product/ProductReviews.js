import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getReviews,
  createReview,
  editReview,
  deleteReview,
  fetchProducts,
} from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReviewModal from "./AddReviewModal";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import ViewReviewModal from "./ViewReviewModal"; // Import the ViewReviewModal

const ProductReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    view: false, // Added view state
    delete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchProductsData();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm]);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Error fetching reviews. Please try again.");
    }
  };

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again.");
    }
  };

  const filterReviews = () => {
    const filtered = reviews.filter((review) =>
      review.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
    setCurrentPage(1);
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleReviewUpdate = async (updatedReview) => {
    try {
      const response = await editReview(selectedReview.id, updatedReview);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === response.id ? response : review
        )
      );
      toast.success("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddReview = async (newReview) => {
    try {
      const addedReview = await createReview(newReview);
      setReviews((prevReviews) => [...prevReviews, addedReview]);
      toast.success("Review added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Error deleting review. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };

  const renderActionButtons = (review) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedReview(review);
          toggleModal("view"); // Open the view modal
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-eye" style={iconStyle("blue")}></i>
      </button>
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedReview(review);
          toggleModal("edit");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-pencil" style={iconStyle("green")}></i>
      </button>
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedReview(review);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <div className="page-content">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-sm-8 text-sm-end">
            <button
              className="btn btn-success btn-rounded waves-effect mb-2 me-2"
              onClick={() => toggleModal("add")}
            >
              <i className="mdi mdi-plus me-1"></i> Add Review
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              title="Export reviews"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>
            <button
              className="btn btn-secondary btn-rounded waves-effect"
              title="Import reviews"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>Rating</th>
                <th>Product Name</th>
                <th>Subject</th>
                <th>Comment</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`mdi mdi-star${
                          index < review.rating ? "" : "-outline"
                        }`}
                        style={{ color: "#FFD700" }}
                      ></i>
                    ))}
                    <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
                      {review.rating}/5
                    </span>
                  </td>
                  <td>{review.product_name}</td>
                  <td>{review.subject}</td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.created).toLocaleString()}</td>
                  <td>{new Date(review.updated).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge badge-soft-${review.status.toLowerCase()}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td>{renderActionButtons(review)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-end">
            {[...Array(totalPages).keys()].map((number) => (
              <li
                className={`page-item ${
                  currentPage === number + 1 ? "active" : ""
                }`}
                key={number}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <AddReviewModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddReview}
        products={products}
      />

      <EditReviewModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleReviewUpdate}
        selectedReview={selectedReview}
        products={products}
      />

      <DeleteReviewModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteReview={handleDeleteReview}
        selectedReview={selectedReview}
      />

      <ViewReviewModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedReview={selectedReview}
      />
    </div>
  );
};

// Styles for buttons and icons
const buttonStyle = { padding: "6px 8px", margin: "0 5px" };
const iconStyle = (color) => ({
  color,
  fontSize: "1.2rem",
});

export default ProductReview;
