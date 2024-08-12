import React, { useState, useContext } from "react";
import axios from "axios";
import { BannerContext } from "./BannerContext";
import './Dashboard.css'

const Dashboard = () => {
  const {banner, setBanner } = useContext(BannerContext);

  // Local state for form inputs
  const [formData, setFormData] = useState({
    description: banner.description,
    timer: banner.timer,
    link: banner.link,
    visible: banner.visible,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate timer to ensure it's not negative
    if (formData.timer < 0) {
      alert("Timer value cannot be negative.");
      return;
    }
    
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/banner`, formData);

    // Re-fetch the banner data to ensure the state is updated with the latest data from the server
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/banner`);
    console.log(response.data);
    setBanner(response.data); // Update the global banner state
  };

  return (
    <div className="dashboard">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Timer (seconds):</label>
          <input
            type="number"
            name="timer"
            value={formData.timer}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Visible:</label>
          <input
            type="checkbox"
            name="visible"
            checked={formData.visible}
            onChange={(e) =>
              setFormData({ ...formData, visible: e.target.checked })
            }
          />
        </div>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
};

export default Dashboard;