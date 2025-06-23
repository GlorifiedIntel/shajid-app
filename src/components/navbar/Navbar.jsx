import React from 'react';
import Links from "./links/Links";
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Shajid College</div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;