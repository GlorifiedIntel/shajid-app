import Link from 'next/link';

const Links = () => {
    const links = [
        { title: 'Sign In', path: '/signin' },
        { title: 'Create Account', path: '/createaccount' },
        { title: 'Events', path: '/events' },
        { title: 'Nursing', path: '/nursing' },
        { title: 'Midwifery', path: '/midwifery' },
    ];
return (
  <div>
    {links.map((link) => (
      <Link href={link.path} key={link.title}>
        {link.title}
      </Link>
    ))}
  </div>
);
};

export default Links; 