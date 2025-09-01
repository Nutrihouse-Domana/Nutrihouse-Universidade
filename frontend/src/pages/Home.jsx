// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Header from "../components/Header";
import CarouselCard from "../components/CarouselCard";
import carouselData from "../data/carouselData";
import styles from "../style/Home.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(
      storedUsername && storedUsername !== "undefined"
        ? storedUsername
        : "Usuário"
    );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <main className={styles.container}>
      <Header username={username} />

      {/* Carrossel */}
      <div className={styles.carouselWrapper}>
        <Slider {...settings}>
          {carouselData.map((item, index) => (
            <div key={index} className="p-4">
              <CarouselCard 
                title={item.title} 
                icon={item.image}
               />
            </div>
          ))}
        </Slider>
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => navigate("/cards")}
            className={styles.seeAllButton}
          >
            Ver todos
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
