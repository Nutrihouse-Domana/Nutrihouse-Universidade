// src/pages/Cards.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CarouselCard from "../components/CarouselCard";
import carouselData from "../data/carouselData";

const Cards = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(
      storedUsername && storedUsername !== "undefined"
        ? storedUsername
        : "Usuário"
    );
  }, []);

  return (
    <main className="bg-white flex flex-col items-center min-h-screen">
      <Header username={username} />
      <div className="w-full flex flex-col items-center px-6 py-8">
        <h1 className="mt-8 text-2xl">Todos os Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mt-6 w-full max-w-screen-xl items-stretch">
          {carouselData.map((item, index) => (
            <div key={index} className="w-full h-full flex justify-center">
              <CarouselCard
                title={item.title} 
                description={item.description}
                icon={item.image}
                className="h-[180px]" // 🔹 altura fixa uniforme
              />
            </div> 
          ))}
        </div>
      </div>
    </main>
  );
};

export default Cards;
