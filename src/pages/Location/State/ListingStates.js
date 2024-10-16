import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStates, createState, editState, deleteState } from "./api"; // Update API functions
import "bootstrap/dist/css/bootstrap.min.css";
import AddStateModal from "./AddModal"; // Modal for adding a state
import EditStateModal from "./EditModal"; // Modal for editing a state
import DeleteStateModal from "./DeleteModal"; // Modal for deleting a state
import ViewStateModal from "./ViewModal"; // Modal for viewing state details

const ListingStates = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statesPerPage] = useState(5); // Number of states per page

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    filterStates();
  }, [states, searchTerm]);

  const fetchStates = async () => {
    try {
      const data = await getStates(); // Ensure API returns expected fields
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Error fetching states. Please try again.");
    }
  };

  const filterStates = () => {
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleStateUpdate = async (updatedState) => {
    try {
      const response = await editState(selectedState.id, updatedState); // Ensure this returns the correct object
      setStates((prevStates) =>
        prevStates.map((state) => (state.id === response.id ? response : state))
      );
      toast.success("State updated successfully!");
    } catch (error) {
      console.error("Error updating state:", error);
      toast.error("Failed to update state. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddState = async (newState) => {
    try {
      const addedState = await createState(newState); // Ensure this returns the correct object
      setStates((prevStates) => [...prevStates, addedState]);
      toast.success("State added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding state. Please try again.");
    }
  };

  const handleDeleteState = async (stateId) => {
    try {
      await deleteState(stateId); // Ensure this works correctly
      setStates((prevStates) =>
        prevStates.filter((state) => state.id !== stateId)
      );
      toast.success("State deleted successfully!");
    } catch (error) {
      toast.error("Error deleting state. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };

  const renderActionButtons = (state) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedState(state);
          toggleModal("view");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-eye" style={iconStyle("blue")}></i>
      </button>
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedState(state);
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
          setSelectedState(state);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastState = currentPage * statesPerPage;
  const indexOfFirstState = indexOfLastState - statesPerPage;
  const currentStates = filteredStates.slice(
    indexOfFirstState,
    indexOfLastState
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredStates.length / statesPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add State
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Country Name</th> {/* Updated column for country name */}
                <th>State Name</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStates.map((state) => (
                <tr key={state.id}>
                  <td>{state.id}</td>
                  <td>{state.country_name}</td> {/* Displaying Country Name */}
                  <td>{state.name}</td>
                  <td>{new Date(state.created).toLocaleDateString()}</td>
                  <td>{new Date(state.updated).toLocaleDateString()}</td>
                  <td>{renderActionButtons(state)}</td>
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

      <AddStateModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddState}
      />

      <EditStateModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleStateUpdate}
        selectedState={selectedState}
      />

      <DeleteStateModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteState={handleDeleteState}
        selectedState={selectedState}
      />

      <ViewStateModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedState={selectedState}
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

export default ListingStates;
