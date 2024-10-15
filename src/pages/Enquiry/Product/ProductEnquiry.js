import React, { useState, useEffect } from "react";
import AddEnquiryModal from "./AddEnquiryModal";
import EditEnquiryModal from "./EditEnquiryModal";
import DeleteEnquiryModal from "./DeleteEnquiryModal";
import DetailModal from "./DetailModal";

import {
  fetchEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "./api";

const ProductEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    detail: false,
  });
  const [currentEnquiry, setCurrentEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const data = await fetchEnquiries(); // Fetching data from the API
        setEnquiries(data);
      } catch (err) {
        setError("Failed to fetch enquiries");
      } finally {
        setLoading(false);
      }
    };

    getEnquiries();
  }, []);

  const handleAddEnquiry = async (newEnquiry) => {
    try {
      const createdEnquiry = await createEnquiry(newEnquiry);
      setEnquiries((prev) => [...prev, createdEnquiry]);
    } catch (err) {
      setError("Failed to add enquiry");
    }
  };

  const handleEditEnquiry = async (updatedEnquiry) => {
    try {
      const editedEnquiry = await updateEnquiry(updatedEnquiry);
      setEnquiries((prev) =>
        prev.map((enquiry) =>
          enquiry.id === editedEnquiry.id ? editedEnquiry : enquiry
        )
      );
    } catch (err) {
      setError("Failed to update enquiry");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((enquiry) => enquiry.id !== id));
    } catch (err) {
      setError("Failed to delete enquiry");
    }
  };

  const toggleModal = (modal) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const openDetailModal = (enquiry) => {
    setCurrentEnquiry(enquiry);
    toggleModal("detail");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Product Enquiry</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">Enquiry</li>
                  <li className="breadcrumb-item active">Products</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8 text-sm-end">
                    <button
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                      onClick={() => toggleModal("add")}
                    >
                      <i className="mdi mdi-plus me-1"></i> Add Enquiry
                    </button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-check">
                    <thead className="table-light">
                      <tr>
                        <th className="align-middle">ID</th>
                        <th className="align-middle">Subject</th>
                        <th className="align-middle">Name</th>
                        <th className="align-middle">Email</th>
                        <th className="align-middle">Mobile</th>
                        <th className="align-middle">Status</th>
                        <th className="align-middle">Products</th>{" "}
                        {/* New Column for Products */}
                        <th className="align-middle">View Details</th>
                        <th className="align-middle">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries
                        .filter(
                          (enquiry) =>
                            enquiry.subject &&
                            enquiry.subject
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                        )
                        .map((enquiry) => (
                          <tr key={enquiry.id}>
                            <td>{enquiry.id}</td>
                            <td>{enquiry.subject}</td>
                            <td>{enquiry.name}</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.mobile}</td>
                            <td>
                              <span
                                className={`badge badge-pill badge-soft-${enquiry.status.toLowerCase()}`}
                              >
                                {enquiry.status}
                              </span>
                            </td>
                            <td>{enquiry.products}</td>{" "}
                            {/* Displaying Products */}
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm btn-rounded"
                                onClick={() => openDetailModal(enquiry)}
                              >
                                View Details
                              </button>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <a
                                  href="javascript:void(0);"
                                  className="text-success"
                                  onClick={() => {
                                    setCurrentEnquiry(enquiry);
                                    toggleModal("edit");
                                  }}
                                >
                                  <i className="mdi mdi-pencil font-size-18"></i>
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="text-danger"
                                  onClick={() => {
                                    setCurrentEnquiry(enquiry);
                                    toggleModal("delete");
                                  }}
                                >
                                  <i className="mdi mdi-delete font-size-18"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal Components */}
                {modalState.add && (
                  <AddEnquiryModal
                    isOpen={modalState.add}
                    onClose={() => toggleModal("add")}
                    onAdd={handleAddEnquiry}
                  />
                )}
                {modalState.edit && (
                  <EditEnquiryModal
                    isOpen={modalState.edit}
                    onClose={() => toggleModal("edit")}
                    enquiry={currentEnquiry}
                    onEdit={handleEditEnquiry}
                  />
                )}
                {modalState.delete && (
                  <DeleteEnquiryModal
                    isOpen={modalState.delete}
                    onClose={() => toggleModal("delete")}
                    enquiry={currentEnquiry}
                    onDelete={handleDeleteEnquiry}
                  />
                )}
                {modalState.detail && (
                  <DetailModal
                    isOpen={modalState.detail}
                    onClose={() => toggleModal("detail")}
                    enquiry={currentEnquiry}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEnquiry;
