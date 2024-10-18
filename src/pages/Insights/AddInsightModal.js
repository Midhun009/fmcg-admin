import React, { useState, useEffect } from "react";
import { getUsers } from "./api";
const AddInsightModal = ({ isVisible, onClose, onAdd, organizations }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    seo_title: "",
    seo_description: "",
    status: "pending",
    slug: "",
    user: "",
    organization: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (isVisible) {
      setFormData({
        title: "",
        image: null,
        description: "",
        seo_title: "",
        seo_description: "",
        status: "pending",
        slug: "",
        user: "",
        organization: "",
      });
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [isVisible]);
  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        console.error("Unexpected users data format:", usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "title") {
      const generatedSlug = generateSlug(value);
      setFormData((prevData) => ({
        ...prevData,
        slug: generatedSlug,
      }));
    }
  };
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      await onAdd(data);
      onClose();
    } catch (error) {
      console.error("Error adding insight:", error);
    }
  };
  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Insight</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Insight Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image Upload</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="seo_title">SEO Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="seo_description">SEO Description</label>
                <textarea
                  name="seo_description"
                  value={formData.seo_description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="user">User</label>
                <select
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select a user
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.user_name}{" "}
                      {}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select an organization
                  </option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.company_name}{" "}
                      {}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddInsightModal;
