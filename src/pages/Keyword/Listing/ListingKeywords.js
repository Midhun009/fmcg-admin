import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getKeywords, // Update your API import
  createKeyword, // Update for keyword creation
  editKeyword, // Update for keyword editing
  deleteKeyword, // Update for keyword deletion
  getOrganizations,
} from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddKeywordModal from "./AddKeywordModal"; // Updated modal import
import EditKeywordModal from "./EditKeywordModal"; // Updated modal import
import DeleteKeywordModal from "./DeleteKeywordModal"; // Updated modal import
import ViewKeywordModal from "./ViewKeywordModal"; // New modal import

const ListingKeywords = () => {
  const [keywords, setKeywords] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false, // New view state
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [keywordsPerPage] = useState(5); // Number of keywords per page
  const [organizations, setOrganizations] = useState([]); // State for organizations

  useEffect(() => {
    fetchKeywords();
    fetchOrganizations(); // Fetch organizations on mount
  }, []);

  useEffect(() => {
    filterKeywords();
  }, [keywords, searchTerm]);

  const fetchKeywords = async () => {
    try {
      const data = await getKeywords();
      setKeywords(data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      toast.error("Error fetching keywords. Please try again.");
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

  const filterKeywords = () => {
    const filtered = keywords.filter(
      (keyword) =>
        keyword.name &&
        keyword.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredKeywords(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleKeywordUpdate = async (updatedKeyword) => {
    try {
      const response = await editKeyword(selectedKeyword.id, updatedKeyword);
      setKeywords((prevKeywords) =>
        prevKeywords.map((keyword) =>
          keyword.id === response.id ? response : keyword
        )
      );
      toast.success("Keyword updated successfully!");
    } catch (error) {
      console.error("Error updating keyword:", error);
      toast.error("Failed to update keyword. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddKeyword = async (newKeyword) => {
    try {
      const addedKeyword = await createKeyword(newKeyword);
      setKeywords((prevKeywords) => [...prevKeywords, addedKeyword]);
      toast.success("Keyword added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding keyword. Please try again.");
    }
  };

  const handleDeleteKeyword = async (keywordId) => {
    try {
      await deleteKeyword(keywordId);
      setKeywords((prevKeywords) =>
        prevKeywords.filter((keyword) => keyword.id !== keywordId)
      );
      toast.success("Keyword deleted successfully!"); // Success toast
    } catch (error) {
      toast.error("Error deleting keyword. Please try again."); // Error toast
    } finally {
      toggleModal("delete", false); // Close the modal after API call finishes
    }
  };

  const renderActionButtons = (keyword) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedKeyword(keyword);
          toggleModal("view");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-eye" style={iconStyle("blue")}></i>{" "}
        {/* View icon */}
      </button>
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedKeyword(keyword);
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
          setSelectedKeyword(keyword);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastKeyword = currentPage * keywordsPerPage;
  const indexOfFirstKeyword = indexOfLastKeyword - keywordsPerPage;
  const currentKeywords = filteredKeywords.slice(
    indexOfFirstKeyword,
    indexOfLastKeyword
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredKeywords.length / keywordsPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add Keyword
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              title="Export keywords"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>
            <button
              className="btn btn-secondary btn-rounded waves-effect"
              title="Import keywords"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>Keyword</th>
                <th>Slug</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentKeywords.map((keyword) => (
                <tr key={keyword.id}>
                  <td>{keyword.name}</td>
                  <td>{keyword.slug}</td>
                  <td>{keyword.section}</td>
                  <td>{renderActionButtons(keyword)}</td>
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

      <AddKeywordModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddKeyword}
        organizations={organizations} // Pass the organizations array if needed
      />

      <EditKeywordModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleKeywordUpdate}
        selectedKeyword={selectedKeyword}
        organizations={organizations} // Pass the organizations array if needed
      />

      <DeleteKeywordModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteKeyword={handleDeleteKeyword}
        selectedKeyword={selectedKeyword}
      />

      <ViewKeywordModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedKeyword={selectedKeyword}
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

export default ListingKeywords;
