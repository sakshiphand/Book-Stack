import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found! Redirecting...");
        setError("Please log in again.");
        navigate("/login");
        return;
      }

      try {
        console.log("Using Token:", token); // ✅ Debugging Token
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:5000/api/customers/profile", config);
        
        console.log("Fetched Profile Data:", data);
        setUser({ name: data.name, email: data.email, password: "" });
      } catch (err) {
        console.error("Profile Fetch Error:", err.response?.data || err.message);
        setError("Failed to load profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      console.log("Updating Profile with Token:", token);

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.put("http://localhost:5000/api/customers/profile", user, config);

      console.log("Profile Updated Successfully!", data);
      alert("Profile Updated Successfully!");
      
      // ✅ Store updated user data in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      console.error("Profile Update Error:", err.response?.data || err.message);
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (Optional)"
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "left",
    padding: "20px",
    backgroundColor: "#FFE4E1", // Misty Rose
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "50px",
  },
  title: {
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    width: "250px",
    padding: "6px",
    fontSize: "13px",
  },
  button: {
    backgroundColor: "#800000", // Maroon
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Profile;
