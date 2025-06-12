import Link from 'next/link';
import styles from './Links.module.css';

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
        <Link href={link.path} key={link.title} className={styles.link}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;