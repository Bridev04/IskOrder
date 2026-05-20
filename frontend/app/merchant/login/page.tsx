"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const merchantStores = [
  "Tess' Store",
  "Chicken City - Area 2",
  "The Food Nook - Econ Lounge",
];

export default function MerchantLoginPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState(merchantStores[0]);
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    const cleanPin = pin.trim();

    if (!cleanUsername || cleanPin.length < 4) {
      setError("Enter a merchant username and a PIN with at least 4 characters.");
      return;
    }

    // TODO: Replace mock merchant session with real role-based authentication.
    window.localStorage.setItem(
      "iskorder-merchant-session",
      JSON.stringify({
        username: cleanUsername,
        storeName,
        signedInAt: new Date().toISOString(),
      }),
    );

    router.push("/merchant");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-16">
      <section>
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Store staff</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-6xl">
          Merchant Login
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
          Manage kiosk orders, pickup times, and store availability from a staff-only view.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-lg bg-white p-4 shadow-sm ring-1 ring-maroon/10 sm:p-6"
        >
          <label className="block">
            <span className="font-bold text-ink">Store</span>
            <select
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-maroon/15 bg-cream px-4 text-sm font-semibold outline-none focus:border-maroon focus:bg-white focus:ring-4 focus:ring-gold/25"
            >
              {merchantStores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-ink">Email, contact, or username</span>
            <input
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-maroon/15 bg-cream px-4 text-sm font-semibold outline-none placeholder:text-ink/40 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-gold/25"
              placeholder="store.staff"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-ink">Password or staff PIN</span>
            <input
              required
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-maroon/15 bg-cream px-4 text-sm font-semibold outline-none placeholder:text-ink/40 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-gold/25"
              placeholder="Enter staff PIN"
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-md bg-maroon/10 px-3 py-2 text-sm font-bold text-maroon">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-maroon px-6 py-3 font-black text-white transition hover:bg-gold hover:text-maroon focus:outline-none focus:ring-4 focus:ring-gold/40"
          >
            Open merchant dashboard
          </button>
        </form>
      </section>

      <aside className="h-fit rounded-lg bg-forest p-4 text-white shadow-sm sm:p-6">
        <h2 className="font-display text-3xl leading-none sm:text-4xl">Kiosk workspace</h2>
        <div className="mt-5 space-y-4 text-sm leading-6 text-white/82">
          <p>View pending orders and pickup times.</p>
          <p>Move orders through preparing, ready, and completed states.</p>
          <p>Keep merchant tools separate from the student ordering flow.</p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex w-full justify-center rounded-md bg-white px-5 py-3 text-sm font-black text-forest sm:w-auto"
        >
          Back to student side
        </Link>
      </aside>
    </div>
  );
}
