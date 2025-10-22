import React from "react";

const CarouselCard = ({ title, icon, onClick}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-gradient-to-b from-[#B95758] to-[#e14d3a] text-white rounded-lg w-72 h-40 p-6 m-4">
      <div className="flex items-center space-x-5">
        <img src={icon} alt={title} className="w-20 h-20 object-contain" /> {/* Ícone */}
        <h1 className="font-poppins text-2x2 font-semi-bold">{title}</h1> {/* Título ao lado do ícone */}
      </div>
    </button>
  );
};

export default CarouselCard;
