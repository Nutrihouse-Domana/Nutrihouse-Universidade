import React from "react";
import { useNavigate } from "react-router-dom";

const CarouselCard = ({ id, title, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center bg-gradient-to-b from-[#B95758] to-[#e14d3a] text-white shadow-2xl rounded-lg w-72 h-40 p-6 m-3"
    >
      <div className="flex items-center space-x-5">
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 object-contain"
        />
        <h1 className="font-poppins text-2x2 font-semi-bold">{title}</h1>
      </div>
    </button>
  );
};

export default CarouselCard;
