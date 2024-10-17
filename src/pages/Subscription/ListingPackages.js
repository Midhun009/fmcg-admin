import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPackages, // API import for packages
  createPackage, // API for package creation
  editPackage, // API for package editing
  deletePackage, // API for package deletion
  getOrganizations,
} from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPackageModal from "./AddPackageModal"; // Modal for adding package
import EditPackageModal from "./EditPackageModal"; // Modal for editing package
import DeletePackageModal from "./DeletePackageModal"; // Modal for deleting package
import ViewPackageModal from "./ViewPackageModal"; // Modal for viewing package

const ListingPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(5); // Number of packages per page
  const [organizations, setOrganizations] = useState([]); // State for organizations

  useEffect(() => {
    fetchPackages();
    fetchOrganizations();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm]);

  const fetchPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Error fetching packages. Please try again.");
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

  const filterPackages = () => {
    const filtered = packages.filter(
      (pkg) =>
        pkg.name && pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handlePackageUpdate = async (updatedPackage) => {
    try {
      const response = await editPackage(selectedPackage.id, updatedPackage);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) => (pkg.id === response.id ? response : pkg))
      );
      toast.success("Package updated successfully!");
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error("Failed to update package. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddPackage = async (newPackage) => {
    try {
      const addedPackage = await createPackage(newPackage);
      setPackages((prevPackages) => [...prevPackages, addedPackage]);
      toast.success("Package added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding package. Please try again.");
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      await deletePackage(packageId);
      setPackages((prevPackages) =>
        prevPackages.filter((pkg) => pkg.id !== packageId)
      );
      toast.success("Package deleted successfully!");
    } catch (error) {
      toast.error("Error deleting package. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };

  const renderActionButtons = (pkg) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedPackage(pkg);
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
          setSelectedPackage(pkg);
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
          setSelectedPackage(pkg);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add Package
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              title="Export packages"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>
            <button
              className="btn btn-secondary btn-rounded waves-effect"
              title="Import packages"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPackages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>{pkg.name}</td>
                  <td>{pkg.price}</td>
                  <td>{pkg.section}</td>
                  <td>{renderActionButtons(pkg)}</td>
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

      <AddPackageModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddPackage}
        organizations={organizations}
      />

      <EditPackageModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handlePackageUpdate}
        selectedPackage={selectedPackage}
        organizations={organizations}
      />

      <DeletePackageModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeletePackage={handleDeletePackage}
        selectedPackage={selectedPackage}
      />

      <ViewPackageModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedPackage={selectedPackage}
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

export default ListingPackages;
