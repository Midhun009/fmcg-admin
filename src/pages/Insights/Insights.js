import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getInsights,
  createInsight,
  editInsight,
  deleteInsight,
  getOrganizations,
  getUsers,
} from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddInsightModal from "./AddInsightModal";
import EditInsightModal from "./EditInsightModal";
import DeleteInsightModal from "./DeleteInsightModal";
import ViewInsightModal from "./ViewInsightModal";
const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [insightsPerPage] = useState(5);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchInsights();
    fetchOrganizations();
    fetchUsers();
  }, []);
  useEffect(() => {
    filterInsights();
  }, [insights, searchTerm]);
  const fetchInsights = async () => {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (error) {
      console.error("Error fetching insights:", error);
      toast.error("Error fetching insights. Please try again.");
    }
  };
  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error("Error fetching organizations. Please try again.");
    }
  };
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Please try again.");
    }
  };
  const filterInsights = () => {
    const filtered = insights.filter(
      (insight) =>
        insight.title &&
        insight.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInsights(filtered);
    setCurrentPage(1);
  };
  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };
  const handleInsightUpdate = async (updatedInsight) => {
    try {
      const response = await editInsight(selectedInsight.id, updatedInsight);
      setInsights((prevInsights) =>
        prevInsights.map((insight) =>
          insight.id === response.id ? response : insight
        )
      );
      toast.success("Insight updated successfully!");
    } catch (error) {
      console.error("Error updating insight:", error);
      toast.error("Failed to update insight. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };
  const handleAddInsight = async (newInsight) => {
    try {
      const addedInsight = await createInsight(newInsight);
      setInsights((prevInsights) => [...prevInsights, addedInsight]);
      toast.success("Insight added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding insight. Please try again.");
    }
  };
  const handleDeleteInsight = async (insightId) => {
    try {
      await deleteInsight(insightId);
      setInsights((prevInsights) =>
        prevInsights.filter((insight) => insight.id !== insightId)
      );
      toast.success("Insight deleted successfully!");
    } catch (error) {
      toast.error("Error deleting insight. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };
  const renderActionButtons = (insight) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedInsight(insight);
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
          setSelectedInsight(insight);
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
          setSelectedInsight(insight);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );
  const indexOfLastInsight = currentPage * insightsPerPage;
  const indexOfFirstInsight = indexOfLastInsight - insightsPerPage;
  const currentInsights = filteredInsights.slice(
    indexOfFirstInsight,
    indexOfLastInsight
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filteredInsights.length / insightsPerPage);
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
              <i className="mdi mdi-plus me-1"></i> Add Insight
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              title="Export insights"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>
            <button
              className="btn btn-secondary btn-rounded waves-effect"
              title="Import insights"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Status</th>
                <th>Created</th>
                <th>Slug</th>
                <th>User </th>
                <th>Organization </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentInsights.map((insight) => (
                <tr key={insight.id}>
                  <td>{insight.title}</td>
                  <td>
                    <img src={insight.image} alt={insight.title} width="50" />
                  </td>
                 
                
                  <td>{insight.status}</td>
                  <td>{new Date(insight.created).toLocaleString()}</td>
                  <td>{insight.slug}</td>
                  <td>{insight.user_name}</td>
                  <td>{insight.organization_name}</td>
                  <td>{renderActionButtons(insight)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {}
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
      <AddInsightModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddInsight}
        organizations={organizations}
        users={users}
      />
      <EditInsightModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        selectedInsight={selectedInsight}
        onUpdate={handleInsightUpdate}
        organizations={organizations}
        users={users}
      />
      <DeleteInsightModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        selectedInsight={selectedInsight}
        onDelete={handleDeleteInsight}
      />
      <ViewInsightModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedInsight={selectedInsight}
      />
    </div>
  );
};
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
export default Insights;
