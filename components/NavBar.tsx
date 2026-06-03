import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul>
          <li className="list-none">
            <Link href="/">Home</Link>
          </li>
          <li className="list-none">
            <Link href="/events">Events</Link>
          </li>
          <li className="list-none">
            <Link href="/create-event">Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar