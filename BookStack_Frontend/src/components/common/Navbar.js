import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>📚 Online Book Store</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          <>
            {user.role === "admin" ? (
              <>
                <Link to="/admin/dashboard" style={styles.link}>Admin Panel</Link>
              </>
            ) : (
              <>
                <Link to="/customer/dashboard" style={styles.link}>My Account</Link>
              </>
            )}
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;