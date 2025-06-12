import Link from "next/link";

const Navbar = () => {
  return <div>
    <div>logo</div>
    <div>
      <Link href="/">Home</Link>
      <Link href="/signin">SIGN IN</Link>
      <Link href="/createaccount">CREATE ACCOUNT</Link>
      <Link href="/apply">APPLY</Link>
      <Link href="/events">EVENTS</Link>
      <Link href="/nursing">NURSING</Link>
      <Link href="/midwifery">MIDWIFERY</Link>
      </div>
  </div>;
};

export default Navbar;