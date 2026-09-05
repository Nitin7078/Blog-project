import React from "react";
import { container, Logo, Logout } from "../index.js";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

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
      name: "login",
      slug: "/login",
      active: !authstatus,
    },
    { name: "signup", slug: "/signup", active: !authstatus },
    {
      nmae: "Allpost",
      slug: "/allpost",
      active: authstatus,
    },
    {
      nmae: "Addpost",
      slug: "/addpost",
      active: authstatus,
    },
  ];
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <container>
        <nav className="flex justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex space-x-4 ml-auto">
            {navitems.map((item, index) => {
              if (item.active) {
                return (
                  <li key={item.name} className="hover:text-gray-400">
                    <button
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              } else {
                return null;
              }
            })}

            {authstatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </container>
    </header>
  );
}

export default Header;
