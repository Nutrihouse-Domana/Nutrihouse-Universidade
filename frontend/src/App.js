import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import VideoList from './components/VideoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/videos" element={<VideoList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
