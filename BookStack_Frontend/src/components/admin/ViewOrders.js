import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Online Book Store. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
};

export default Footer;