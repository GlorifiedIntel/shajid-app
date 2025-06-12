import React from 'react';
import Links from "./links/Links";
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Shajid Collge <span className={styles.fontlight}>of Nursing & Midwifery</span></div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;