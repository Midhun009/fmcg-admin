import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCountries, createCountry, editCountry, deleteCountry } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCountryModal from "./AddModal"; // Modal for adding a country
import EditCountryModal from "./EditModal"; // Modal for editing a country
import DeleteCountryModal from "./DeleteModal"; // Modal for deleting a country
import ViewCountryModal from "./ViewModal"; // Modal for viewing country details

const ListingCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5); // Number of countries per page

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [countries, searchTerm]);

  const fetchCountries = async () => {
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Error fetching countries. Please try again.");
    }
  };

  const filterCountries = () => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleCountryUpdate = async (updatedCountry) => {
    try {
      const response = await editCountry(selectedCountry.id, updatedCountry);
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === response.id ? response : country
        )
      );
      toast.success("Country updated successfully!");
    } catch (error) {
      console.error("Error updating country:", error);
      toast.error("Failed to update country. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddCountry = async (newCountry) => {
    try {
      const addedCountry = await createCountry(newCountry);
      setCountries((prevCountries) => [...prevCountries, addedCountry]);
      toast.success("Country added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding country. Please try again.");
    }
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await deleteCountry(countryId);
      setCountries((prevCountries) =>
        prevCountries.filter((country) => country.id !== countryId)
      );
      toast.success("Country deleted successfully!");
    } catch (error) {
      toast.error("Error deleting country. Please try again.");
    } finally {
      toggleModal("delete", false);
    }
  };

  const renderActionButtons = (country) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedCountry(country);
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
          setSelectedCountry(country);
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
          setSelectedCountry(country);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add Country
            </button>
            <button
              className="btn btn-primary btn-rounded waves-effect me-2"
              // onClick={() => handleExport()}
              title="Export categories"
            >
              <i className="mdi mdi-export me-1"></i> Export
            </button>

            <button
              className="btn btn-secondary btn-rounded waves-effect"
              // onClick={() => handleImport()}
              title="Import categories"
            >
              <i className="mdi mdi-import me-1"></i> Import
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Country Name</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCountries.map((country) => (
                <tr key={country.id}>
                  <td>{country.id}</td>
                  <td>{country.name}</td>
                  <td>{new Date(country.created).toLocaleDateString()}</td>
                  <td>{new Date(country.updated).toLocaleDateString()}</td>
                  <td>{renderActionButtons(country)}</td>
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

      <AddCountryModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAdd={handleAddCountry}
      />

      <EditCountryModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleCountryUpdate}
        selectedCountry={selectedCountry}
      />

      <DeleteCountryModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteCountry={handleDeleteCountry}
        selectedCountry={selectedCountry}
      />

      <ViewCountryModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedCountry={selectedCountry}
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

export default ListingCountries;
