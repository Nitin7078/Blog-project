import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-block transition-transform duration-200 hover:scale-105"
            >
              <Logo width="120px" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              A simple and modern platform to create, share and explore
              amazing blog posts.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full
                bg-white/5 text-gray-400 transition-all duration-200
                hover:bg-white/10 hover:text-white"
              >
                G
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full
                bg-white/5 text-gray-400 transition-all duration-200
                hover:bg-white/10 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full
                bg-white/5 text-gray-400 transition-all duration-200
                hover:bg-white/10 hover:text-white"
              >
                in
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/add-post"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Create Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Sign Up
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Your Blog. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;