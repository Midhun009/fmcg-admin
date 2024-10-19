// ListingCategory.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/bootstrap.min.css";
import "../../../styles/app.min.css";
import "../../../styles/icons.min.css";

import {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
} from "./api"; // apis import 
import "bootstrap/dist/css/bootstrap.min.css";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import ViewCategoryModal from "./ViewCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const ListingCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Number of categories per page

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories. Please try again.");
    }
  };

  const filterCategories = () => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const toggleModal = (modal, state = true) => {
    setModalState((prev) => ({ ...prev, [modal]: state }));
  };

  const handleCategoryUpdate = async (updatedCategory) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedCategory.name);
      formData.append("slug", updatedCategory.slug);
      formData.append("seo_title", updatedCategory.seo_title);
      formData.append("seo_description", updatedCategory.seo_description);
      formData.append("image_alt", updatedCategory.image_alt);

      if (updatedCategory.image) {
        formData.append("image", updatedCategory.image);
      }

      const response = await editCategory(selectedCategory.id, formData);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === response.id ? response : category
        )
      );
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    } finally {
      toggleModal("edit", false);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const addedCategory = await createCategory(newCategory);
      setCategories((prevCategories) => [...prevCategories, addedCategory]);
      toast.success("Category added successfully!");
      toggleModal("add", false);
    } catch (error) {
      toast.error("Error adding category. Please try again.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      toast.success("Category deleted successfully!");
      toggleModal("delete", false);
    } catch (error) {
      toast.error("Error deleting category. Please try again.");
    }
  };

  const renderActionButtons = (category) => (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light d-flex align-items-center"
        onClick={() => {
          setSelectedCategory(category);
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
          setSelectedCategory(category);
          toggleModal("delete");
        }}
        style={buttonStyle}
      >
        <i className="mdi mdi-delete" style={iconStyle("red")}></i>
      </button>
    </div>
  );

  // Pagination Logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

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
              <i className="mdi mdi-plus me-1"></i> Add Category
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
                <th>Name</th>
                <th>Image</th>
                <th>Slug</th>
                <th>View Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{category.slug}</td>
                  <td>
                    <button
                      className="btn btn-primary rounded-pill btn-sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        toggleModal("view");
                      }}
                    >
                      View Details
                    </button>
                  </td>
                  <td>{renderActionButtons(category)}</td>
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

      <AddCategoryModal
        isVisible={modalState.add}
        onClose={() => toggleModal("add", false)}
        onAddCategory={handleAddCategory}
      />

      <EditCategoryModal
        isVisible={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        onSave={handleCategoryUpdate}
        selectedCategory={selectedCategory}
      />

      <ViewCategoryModal
        isVisible={modalState.view}
        onClose={() => toggleModal("view", false)}
        selectedCategory={selectedCategory}
      />

      <DeleteCategoryModal
        isVisible={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onDeleteCategory={handleDeleteCategory}
        selectedCategory={selectedCategory}
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

export default ListingCategory;
