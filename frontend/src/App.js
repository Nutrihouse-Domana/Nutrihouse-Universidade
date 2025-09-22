import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 
import Home from "./pages/Home";
import Sobre from './pages/Sobre';
import Cards from "./pages/Cards";
import VideoPage from "./pages/VideoPage";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/cards" element={<Cards />} />
    <Route path="/video/:id" element={<VideoPage />} />
    <Route path="/sobre" element={<Sobre />} />
  </Routes>
</Router>
  );
}

export default App;
