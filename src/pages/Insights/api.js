import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/insights"; 
export const getInsights = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enquiries:", error.response || error.message);
    throw new Error("Failed to fetch enquiries. Please try again later.");
  }
};
export const createInsight = async (enquiryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create/`, enquiryData);
    return response.data;
  } catch (error) {
    console.error("Error creating enquiry:", error.response || error.message);
    throw new Error("Failed to create enquiry. Please try again.");
  }
};
export const viewReview = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/view/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error viewing enquiry:", error.response || error.message);
    throw new Error("Failed to view enquiry. Please try again.");
  }
};
export const editInsight = async (id, enquiryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}/`, enquiryData);
    return response.data;
  } catch (error) {
    console.error("Error updating enquiry:", error.response || error.message);
    throw new Error("Failed to update enquiry. Please try again.");
  }
};
export const deleteInsight = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}/`);
  } catch (error) {
    console.error("Error deleting enquiry:", error.response || error.message);
    throw new Error("Failed to delete enquiry. Please try again.");
  }
};
export const getOrganizations = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/organization/list/"
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    throw error; 
  }
};
export const getUsers = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/insights/list/"); 
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    throw error; 
  }
};