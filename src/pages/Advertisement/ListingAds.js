import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAds,
  createAd,
  editAd,
  deleteAd,
  getOrganizations,
  getPackages,
} from "./api"; // Updated API functions
import "bootstrap/dist/css/bootstrap.min.css";
import AddAdModal from "./AddModal"; // Modal for adding an advertisement
import EditAdModal from "./EditModal"; // Modal for editing an advertisement
import DeleteAdModal from "./DeleteModal"; // Modal for deleting an advertisement
import ViewAdModal from "./ViewModal"; // Modal for viewing advertisement details

const ListingAds = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(5); // Number of ads per page
  const [organizations, setOrganizations] = useState([]); // State for organizations
  const [packages, setPackages] = useState([]); // State for packages

  useEffect(() => {
    fetchAds();
    fetchOrganizations(); // Fetch organizations when component mounts
    fetchPackages(); // Fetch packages when component mounts
  }, []);

  useEffect(() => {
    filterAds();
  }, [ads, searchTerm]);

  const fetchAds = async () => {
    try {
      const data = await getAds(); // Ensure API returns expected fields
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Error fetching advertisements. Please try again.");
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations(); // Fetch organizations
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error("Error fetching organizations. Please try again.");
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await getPackages(); // Fetch packages
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Error fetching packages. Please try again.");
    }
  };

  const filterAds = () => {
    const filtered = ads.filter(
      (ad) =>
        ad.link && ad.link.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleAdUpdate = async (updatedAd) => {
    try {
      const response = await editAd(selectedAd.id, updatedAd); // Ensure this returns the correct object
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === response.id ? response : ad))
      );
      toast.success("Advertisement updated successfully!");
    } catch (error) {
      console.error("Error updating ad:", error);
      toast.error("Failed to update advertisement. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddAd = async (newAd) => {
    try {
      const addedAd = await createAd(newAd); // Ensure this returns the correct object
      setAds((prevAds) => [...prevAds, addedAd]);
      toast.success("Advertisement added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding advertisement. Please try again.");
    }
  };

  const handleDeleteAd = async (adId) => {
    try {
      await deleteAd(adId); // Ensure this works correctly
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
      toast.success("Advertisement deleted successfully!");
    } catch (error) {
      toast.error("Error deleting advertisement. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };

  const renderActionButtons = (ad) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedAd(ad);
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
          setSelectedAd(ad);
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
          setSelectedAd(ad);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  return (
    <div className="page-content">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by link..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-sm-8 text-sm-end">
            <button
              className="btn btn-success btn-rounded waves-effect mb-2 me-2"
              onClick={() => toggleModal("add")}
            >
              <i className="mdi mdi-plus me-1"></i> Add Advertisement
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Link</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Organization</th>
                <th>Package</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentAds.map((ad) => (
                <tr key={ad.id}>
                  <td>{ad.id}</td>
                  <td>
                    <img
                      src={ad.image} // Ensure that the image field is present in the ad object
                      alt="ad"
                      style={{ width: "100px", height: "50px" }}
                    />
                  </td>
                  <td>{ad.link}</td>
                  <td>{new Date(ad.start_date).toLocaleDateString()}</td>
                  <td>{new Date(ad.end_date).toLocaleDateString()}</td>
                  <td>{ad.status}</td>
                  <td>{ad.organization_name}</td>
                  <td>{ad.package_name}</td>
                  <td>{renderActionButtons(ad)}</td>
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

      <AddAdModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onSave={handleAddAd}
        organizations={organizations} // Pass organizations to the modal
        packages={packages} // Pass packages to the modal
      />

      <EditAdModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleAdUpdate}
        selectedAd={selectedAd}
        organizations={organizations} // Pass organizations to the modal
        packages={packages} // Pass packages to the modal
      />

      <DeleteAdModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDelete={() => handleDeleteAd(selectedAd.id)}
        adName={selectedAd?.link} // Display the link in the delete modal
      />

      <ViewAdModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        ad={selectedAd}
      />
    </div>
  );
};

const buttonStyle = {
  border: "none",
  background: "none",
  cursor: "pointer",
};

const iconStyle = (color) => ({
  color: color,
  fontSize: "20px",
});

export default ListingAds;
