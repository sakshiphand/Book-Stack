import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// Admin Components
import AddBook from "./components/admin/AddBook";
import DeleteBook from "./components/admin/DeleteBook";
import UpdateBook from "./components/admin/UpdateBook";
import ViewOrders from "./components/admin/ViewOrders";

// Customer Components
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import Profile from "./components/customer/Profile";
import BookList from "./components/customer/BookList";
import BookDetails from "./components/customer/BookDetails";
import Orders from "./components/customer/Orders";
import Cart from "./components/customer/Cart";




const App = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("🔄 Checking Redux State on App Load:");
    console.log("User:", user);
    console.log("LocalStorage User:", localStorage.getItem("user"));
  }, [user]);

  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} /> {/* ✅ Fixed Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Customer Routes */}
          <Route
            path="/customer/dashboard"
            element={user && user.role === "customer" ? <CustomerDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user && user.role === "customer" ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user && user.role === "customer" ? <Orders /> : <Navigate to="/login" />}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/add-book"
            element={user && user.role === "admin" ? <AddBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/manage-books"
            element={user && user.role === "admin" ? <DeleteBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/update-book/:id"
            element={user && user.role === "admin" ? <UpdateBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/orders"
            element={user && user.role === "admin" ? <ViewOrders /> : <Navigate to="/login" />}
          />
       
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;