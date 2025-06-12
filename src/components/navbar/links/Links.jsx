'use client';

import styles from './links.module.css';
import NavLink from './navLink/navLink';

const Links = () => {
  const links = [
    { title: 'SIGN IN', path: '/signin' },
    { title: 'CREATE ACCOUNT', path: '/createaccount' },
    { title: 'EVENTS', path: '/events' },
    { title: 'NURSING', path: '/nursing' },
    { title: 'MIDWIFERY', path: '/midwifery' },
  ];

  return (
    <div className={styles.links}>
      {links.map((link) => (
       <NavLink item={link} key={link.title}/>
      ))}
    </div>
  );
};

export default Links;