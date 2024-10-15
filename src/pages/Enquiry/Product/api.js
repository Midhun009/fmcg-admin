import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/product_enquiry"; // Adjust the URL as needed

export const getEnquiries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list/`);
    return response.data; // Assuming the response structure is { data: [...] }
  } catch (error) {
    console.error("Error fetching enquiries:", error.response || error.message);
    throw new Error("Failed to fetch enquiries. Please try again later.");
  }
};

export const createEnquiry = async (enquiryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create/`, enquiryData);
    return response.data; // Assuming the response structure is the created enquiry
  } catch (error) {
    console.error("Error creating enquiry:", error.response || error.message);
    throw new Error("Failed to create enquiry. Please try again.");
  }
};

export const editEnquiry = async (id, enquiryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}/`, enquiryData);
    return response.data; // Assuming the response structure is the updated enquiry
  } catch (error) {
    console.error("Error updating enquiry:", error.response || error.message);
    throw new Error("Failed to update enquiry. Please try again.");
  }
};

export const deleteEnquiry = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}/`);
  } catch (error) {
    console.error("Error deleting enquiry:", error.response || error.message);
    throw new Error("Failed to delete enquiry. Please try again.");
  }
};

export const viewEnquiry = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/view/${id}/`);
    return response.data; // Assuming the response structure is the viewed enquiry
  } catch (error) {
    console.error("Error viewing enquiry:", error.response || error.message);
    throw new Error("Failed to view enquiry. Please try again.");
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/product/list/");

    // Extract id and name for each product
    const products = response.data.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    return products; // Return the filtered products array
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Re-throw error to be handled by the calling function
  }
};


export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/product/list/");

    // Extract id and name for each product
    const products = response.data.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    return products; // Return the filtered products array
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Re-throw error to be handled by the calling function
  }
};
