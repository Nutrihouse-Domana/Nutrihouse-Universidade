import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from "../assets/NH_universidade_logo.png";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== "undefined") {
      setUsername(storedUsername);
    } else {
      setUsername("Usuário");
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between px-24 py-4 bg-white">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-32 mr-4" />
        </div>
        <h2 className="text-lg font-bold">
          Olá, <span className="text-red-500">{username}</span> 👋
        </h2>
      </div>

      {/* Carrossel */}
      <div className="w-3/4 mt-6">
        <Slider {...settings}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="bg-red-500 rounded-lg text-white p-6 text-center">
                <div className="w-full h-32 bg-white rounded mb-2"></div>
                <h3 className="text-lg font-bold">Teknisa</h3>
                <p>Implantação</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
