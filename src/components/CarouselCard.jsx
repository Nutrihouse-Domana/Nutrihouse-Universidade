import React from "react";
import styles from "../pages/Cards.module.css";

const CarouselCard = ({ title, description }) => (
  <div className="flex justify-center">
    <div className={styles.card}>
      <div className={styles.cardImage}></div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

export default CarouselCard;
