import Link from "next/link";

export default function Navigation() {
  return (
    <div className="py-5 px-5 bg-red-400 flex items-center justify-between">
      <div>
        <p>LOGO IMAGE</p>
      </div>
      <ul className="flex items-center space-x-8 text-red-100">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="register">Register</Link>
        </li>
        <li>
          <Link
            href="login"
            className="hover:bg-white/90 hover:text-red-500 hover:p-2 hover:px-6 transition-all duration-300"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
