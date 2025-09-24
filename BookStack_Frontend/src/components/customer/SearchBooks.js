import React, { useState } from "react";

const SearchBook = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <input
      type="text"
      placeholder="Search for a book..."
      value={query}
      onChange={handleSearch}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchBook;