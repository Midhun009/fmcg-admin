import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/listing_category";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list/`);
    return response.data; // Assuming the response structure is { data: [...] }
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response || error.message
    );
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create/`, categoryData);
    return response.data; // Assuming the response structure is the created category
  } catch (error) {
    console.error("Error creating category:", error.response || error.message);
    throw new Error("Failed to create category. Please try again.");
  }
};

export const editCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}/`, categoryData);
    return response.data; // Assuming the response structure is the updated category
  } catch (error) {
    console.error("Error updating category:", error.response || error.message);
    throw new Error("Failed to update category. Please try again.");
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}/`);
  } catch (error) {
    console.error("Error deleting category:", error.response || error.message);
    throw new Error("Failed to delete category. Please try again.");
  }
};
