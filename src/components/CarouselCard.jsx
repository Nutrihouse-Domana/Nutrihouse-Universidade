import React from "react";
import styles from "./CarouselCard.module.css";

const CarouselCard = ({ title, description }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.image}></div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
