import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"; 

function Layout() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add only top-level routes here */}
        </Routes>
      </div>
    </>
  );
}

export default Layout;





