import styles from "./Header.module.css";
import Logo from "../assets/NH_universidade_logo.png";

const Header = ({ username }) => (
  <header className={styles.header}>
    <img src={Logo} alt="Logo da empresa" className={styles.logo} />
    <h2 className={styles.greeting}>
      Olá, <span className={styles.username}>{username}</span> 👋
    </h2>
  </header>
);

export default Header;
