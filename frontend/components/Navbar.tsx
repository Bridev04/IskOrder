"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { customerProfileKey, getLoginRedirect, hasCustomerProfile } from "@/lib/auth";

const navItems = [
  { href: "/restaurants", label: "Kiosks" },
  { href: "/cart", label: "Cart" },
  { href: "/profile", label: "Profile" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled;
  const visibleNavItems = isLoggedIn
    ? navItems
    : navItems.filter((item) => item.href === "/restaurants" || item.href === "/about");

  function handleLogout() {
    window.localStorage.removeItem(customerProfileKey);
    window.location.href = "/login";
  }

  useEffect(() => {
    function updateHeader() {
      setScrolled(window.scrollY > 48);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    setIsLoggedIn(hasCustomerProfile());
  }, [pathname]);

  return (
    <header
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b transition duration-300 ${
        isSolid
          ? "border-maroon/10 bg-paper/95 shadow-sm backdrop-blur"
          : "border-transparent bg-transparent shadow-none"
      }`}
    >
      <nav className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link
          href="/"
          className="flex min-h-12 items-center rounded-md focus:outline-none focus:ring-4 focus:ring-gold/40"
          aria-label="IskOrder home"
        >
          <img
            src="/images/headerlogo.png"
            alt="IskOrder"
            className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-14"
          />
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-2 overflow-x-auto lg:order-2 lg:w-auto">
          {visibleNavItems.map((item) => {
            const active =
              item.href === "/cart"
                ? pathname === "/cart"
                : item.href === "/profile"
                  ? pathname === "/profile" || pathname === "/login"
                : item.href === "/restaurants"
                  ? pathname.startsWith("/restaurants")
                : item.href === "/about"
                  ? pathname === "/about"
                  : false;
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={`inline-flex min-h-12 items-center rounded-md px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40 ${
                  active
                    ? isSolid
                      ? "bg-maroon text-white"
                      : "bg-white/15 text-white"
                    : isSolid
                      ? "text-maroon hover:bg-white"
                      : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="order-2 flex items-center gap-2 lg:order-3">
          {isLoggedIn ? (
            <Link
              href="/cart"
              className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-md transition focus:outline-none focus:ring-4 focus:ring-gold/40 ${
                isSolid
                  ? "text-maroon hover:bg-white"
                  : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] hover:bg-white/10"
              }`}
              aria-label={`View cart${totalItems > 0 ? ` with ${totalItems} items` : ""}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.5 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              </svg>
              {totalItems > 0 ? (
                <span className="ml-1 rounded-full bg-gold px-2 py-0.5 text-xs font-black text-maroon">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          ) : null}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className={`inline-flex min-h-12 items-center rounded-md px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40 ${
                isSolid
                  ? "bg-white text-maroon hover:bg-maroon hover:text-white"
                  : "bg-white/10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] hover:bg-white hover:text-maroon"
              }`}
            >
              Log out
            </button>
          ) : (
            <Link
              href={getLoginRedirect(pathname)}
              className={`inline-flex min-h-12 items-center rounded-md px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40 ${
                isSolid
                  ? "bg-maroon text-white hover:bg-gold hover:text-maroon"
                  : "bg-white text-maroon shadow-sm hover:bg-gold"
              }`}
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

