import React from "react";
import styles from "../style/Cards.module.css";

const CarouselCard = ({ title, icon }) => {
  return (
    <div className={styles.carouselCard}>
      <div className={styles.carouselCardIcon}>
        <img src={icon} alt={title} className={styles.iconImage} />
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default CarouselCard;