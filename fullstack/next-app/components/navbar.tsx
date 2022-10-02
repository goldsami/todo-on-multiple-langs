import Link from "next/link";
import {useRouter} from "next/router";

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link href="/tasks">
            <a className={`navbar-item ${router.pathname === '/tasks' && 'is-active'}`}>
              Tasks
            </a>
          </Link>

          <Link href="/people">
            <a className={`navbar-item ${router.pathname === '/people' && 'is-active'}`}>
              People
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}