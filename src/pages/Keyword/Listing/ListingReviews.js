import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getReviews,
  createReview,
  editReview,
  deleteReview,
  getOrganizations,
} from "./api"; // Update your api import
import "bootstrap/dist/css/bootstrap.min.css";
import AddReviewModal from "./AddReviewModal";
import EditReviewModal from "./EditReviewModal";
import ViewReviewModal from "./ViewReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

const ListingReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5); // Number of reviews per page
  const [organizations, setOrganizations] = useState([]); // State for organizations

  useEffect(() => {
    fetchReviews();
    fetchOrganizations(); // Fetch organizations on mount
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

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations(); // Fetch organizations
      setOrganizations(data); // Set organizations state
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error("Error fetching organizations. Please try again.");
    }
  };

  const filterReviews = () => {
    const filtered = reviews.filter((review) =>
      review.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
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
      toast.success("Review deleted successfully!"); // Success toast
    } catch (error) {
      toast.error("Error deleting review. Please try again."); // Error toast
    } finally {
      toggleModal("delete", false); // Close the modal after API call finishes
    }
  };

  const renderActionButtons = (review) => (
    <div className="d-flex align-items-center">
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
        className="d-flex align-items-center"
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
                <th>Subject</th>
                <th>Comment</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Status</th>
                <th>Company Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    {/* Display stars based on the review.rating */}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`mdi mdi-star${
                          index < review.rating ? "" : "-outline"
                        }`}
                        style={{ color: "#FFD700" }} // Gold color for stars
                      ></i>
                    ))}
                    {/* Display the number rating next to the stars */}
                    <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
                      {review.rating}/5
                    </span>
                  </td>
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
                  <td>{review.company_name}</td>
                  <td>{renderActionButtons(review)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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
        organizations={organizations} // Pass the organizations array if needed
      />

      <EditReviewModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleReviewUpdate}
        selectedReview={selectedReview}
        organizations={organizations} // Pass the organizations array if needed
      />

      <DeleteReviewModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteReview={handleDeleteReview}
        selectedReview={selectedReview}
      />
    </div>
  );
};

// Styles for reusable button and icons
const buttonStyle = {
  backgroundColor: "transparent",
  border: "none",
  padding: "5px",
  cursor: "pointer",
};

const iconStyle = (color) => ({
  color,
  fontSize: "18px",
  marginLeft: "5px",
});

export default ListingReview;
