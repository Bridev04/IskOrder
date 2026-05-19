"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getLoginRedirect, hasCustomerProfile } from "@/lib/auth";

function isPublicRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/feedback" ||
    pathname === "/terms" ||
    pathname.startsWith("/restaurants") ||
    pathname.startsWith("/merchant")
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkedSession, setCheckedSession] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const publicRoute = isPublicRoute(pathname);

  useEffect(() => {
    const loggedIn = hasCustomerProfile();
    setIsLoggedIn(loggedIn);
    setCheckedSession(true);

    if (!loggedIn && !publicRoute) {
      router.replace(getLoginRedirect(window.location.pathname, window.location.search));
    }
  }, [pathname, publicRoute, router]);

  if (publicRoute) {
    if (pathname === "/login" || pathname.startsWith("/merchant")) {
      return <>{children}</>;
    }

    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  if (!checkedSession || !isLoggedIn) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-gold-dark">
            IskOrder
          </p>
          <h1 className="font-display mt-2 text-5xl leading-none text-maroon">
            Checking login
          </h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
