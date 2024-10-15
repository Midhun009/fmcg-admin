import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEnquiries,
  createEnquiry,
  editEnquiry,
  deleteEnquiry,
  getProducts,
} from "./api"; // Update your api import
import "bootstrap/dist/css/bootstrap.min.css";
import AddEnquiryModal from "./AddEnquiryModal";
import EditEnquiryModal from "./EditEnquiryModal";
import ViewEnquiryModal from "./ViewEnquiryModal";
import DeleteEnquiryModal from "./DeleteEnquiryModal";

const ProductEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage] = useState(5); // Number of enquiries per page
  const [organizations, setOrganizations] = useState([]); // State for organizations

  useEffect(() => {
    fetchEnquiries();
    fetchOrganizations(); // Fetch organizations on mount
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [enquiries, searchTerm]);

  const fetchEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Error fetching enquiries. Please try again.");
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getProducts(); // Fetch organizations
      setOrganizations(data); // Set organizations state
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error("Error fetching organizations. Please try again.");
    }
  };

  const filterEnquiries = () => {
    const filtered = enquiries.filter((enquiry) =>
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleEnquiryUpdate = async (updatedEnquiry) => {
    try {
      const response = await editEnquiry(selectedEnquiry.id, updatedEnquiry);
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry.id === response.id ? response : enquiry
        )
      );
      toast.success("Enquiry updated successfully!");
    } catch (error) {
      console.error("Error updating enquiry:", error);
      toast.error("Failed to update enquiry. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddEnquiry = async (newEnquiry) => {
    try {
      const addedEnquiry = await createEnquiry(newEnquiry);
      setEnquiries((prevEnquiries) => [...prevEnquiries, addedEnquiry]);
      toast.success("Enquiry added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding enquiry. Please try again.");
    }
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    try {
      await deleteEnquiry(enquiryId);
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry.id !== enquiryId)
      );
      toast.success("Enquiry deleted successfully!"); // Success toast
    } catch (error) {
      toast.error("Error deleting enquiry. Please try again."); // Error toast
    } finally {
      toggleModal("delete", false); // Close the modal after API call finishes
    }
  };

  const renderActionButtons = (enquiry) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedEnquiry(enquiry);
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
          setSelectedEnquiry(enquiry);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(
    indexOfFirstEnquiry,
    indexOfLastEnquiry
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add Enquiry
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              title="Export enquiries"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>
            <button
              className="btn btn-secondary btn-rounded waves-effect"
              title="Import enquiries"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>Product Name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>View Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.product_name}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.mobile}</td>
                  <td>{enquiry.subject}</td>
                  <td>{enquiry.message}</td>
                  <td>
                    <span
                      className={`badge badge-soft-${enquiry.status.toLowerCase()}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary rounded-pill btn-sm"
                      onClick={() => {
                        setSelectedEnquiry(enquiry);
                        toggleModal("view");
                      }}
                    >
                      View Details
                    </button>
                  </td>
                  <td>{renderActionButtons(enquiry)}</td>
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

      <AddEnquiryModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddEnquiry}
        organizations={organizations} // Pass the organizations array
      />

      <EditEnquiryModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleEnquiryUpdate}
        selectedEnquiry={selectedEnquiry}
        organizations={organizations} // Pass the organizations array
      />

      <ViewEnquiryModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedEnquiry={selectedEnquiry}
      />

      <DeleteEnquiryModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteEnquiry={handleDeleteEnquiry}
        selectedEnquiry={selectedEnquiry}
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

export default ProductEnquiry;
