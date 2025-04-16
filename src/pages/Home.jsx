import { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from "../components/Header";
import CarouselCard from "../components/CarouselCard";
import styles from "./Home.module.css";
import carouselData from "../data/carouselData";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername && storedUsername !== "undefined" ? storedUsername : "Usuário");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  

  return (
    <main className={styles.container}>
      <Header username={username} />
      <div className={styles.carouselWrapper}>
        <Slider {...settings}>
          {carouselData.map((item, index) => (
            <CarouselCard key={index} title={item.title} description={item.description} />
          ))}
        </Slider>
      </div>
    </main>
  );
};

export default Home;
