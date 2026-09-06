import React from "react";
import { Container, Logo, Logout } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navitems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authstatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authstatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authstatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-900/95 backdrop-blur-md shadow-lg">
      <Container>
        <nav className="flex min-h-[72px] items-center justify-between gap-6">
          
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <Logo />
          </Link>

          {/* Navigation */}
          <div className="flex items-center">
            <ul className="flex items-center gap-2">
              {navitems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {/* Logout */}
              {authstatus && (
                <li className="ml-2 border-l border-white/10 pl-3">
                  <Logout />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;