import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-maroon/10 bg-stone px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <img
          src="/images/iskorder-logo-upd-new.png"
          alt="IskOrder"
          className="h-16 w-auto object-contain"
        />

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/72">
          <Link href="/restaurants" className="hover:text-maroon">
            Kiosks
          </Link>
          <Link href="/about" className="hover:text-maroon">
            About
          </Link>
          <Link href="/cart" className="hover:text-maroon">
            Cart
          </Link>
          <Link href="/login" className="hover:text-maroon">
            Log in
          </Link>
          <Link href="/profile" className="hover:text-maroon">
            Profile
          </Link>
          <Link href="/merchant/login" className="hover:text-maroon">
            Merchant Login
          </Link>
          <Link href="/feedback" className="hover:text-maroon">
            Feedback
          </Link>
          <Link href="/terms" className="hover:text-maroon">
            Terms
          </Link>
        </nav>

        <p className="text-sm text-ink/58">&copy; 2026 IskOrder. Crafted for UP Diliman.</p>
      </div>
    </footer>
  );
}
