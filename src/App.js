import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; // Seu componente de Login existente
import Home from "./pages/Home";
import Cards from "./pages/Cards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </Router>
  );
}

export default App;
