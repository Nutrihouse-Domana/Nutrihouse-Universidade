import React from "react";
import styles from "../style/Cards.module.css";
import Logo from "../assets/logos/logo_preta.png";

const Header = ({ username }) => (
  <header className={styles.header}>
    <img src={Logo} alt="Logo da empresa" className={styles.logo} />
    <h2 className={styles.greeting}>
      Olá, <span className={styles.username}>{username}</span> 👋
    </h2>
  </header>
);

export default Header;
