"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { CustomerRole } from "@/lib/auth";

export default function LoginPage() {
  const [role, setRole] = useState<CustomerRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [form5Name, setForm5Name] = useState("");
  const isTeacher = role === "teacher";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.localStorage.setItem(
      "iskorder-profile",
      JSON.stringify({
        role,
        name,
        email,
        contactNumber,
        courseYear: isTeacher ? "" : affiliation,
        department: isTeacher ? affiliation : "",
        verificationStatus: isTeacher
          ? "Teacher account verified"
          : form5Name
            ? "Form 5 submitted for review"
            : "UP Mail verified",
      }),
    );

    const redirectTo = new URLSearchParams(window.location.search).get("next") ?? "/profile";
    window.location.href = redirectTo;
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(33, 26, 26, 0.84), rgba(33, 26, 26, 0.54)), linear-gradient(180deg, rgba(33, 26, 26, 0.2), rgba(33, 26, 26, 0.56)), url('/images/login-background.png')",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="font-black uppercase tracking-[0.2em] text-gold">Log in</p>
          <h1 className="font-display mt-2 text-5xl leading-none text-white sm:text-6xl">
            Verify as a student or teacher
          </h1>
          <p className="mt-4 text-lg font-medium leading-8 text-cream drop-shadow-sm">
            Guests can view menus, but ordering needs a verified student or teacher profile
            so pickup notices and reviews are tied to one contact number.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <form
            id="account-login-form"
            onSubmit={handleSubmit}
            className="rounded-lg bg-white/95 p-6 shadow-xl ring-1 ring-white/30 backdrop-blur-sm"
          >
          <h2 className="font-display text-4xl leading-none text-maroon">
            Account verification
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Choose whether you are ordering as a student or teacher. Student accounts may
            upload Form 5 for enrollment review.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Account type">
            {(["student", "teacher"] as CustomerRole[]).map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-lg border p-4 capitalize transition ${
                  role === option
                    ? "border-maroon bg-maroon text-white"
                    : "border-maroon/15 bg-cream text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={role === option}
                  onChange={() => setRole(option)}
                  className="sr-only"
                />
                <span className="font-black">{option}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-bold text-ink">Name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
                placeholder="Juan dela Cruz"
              />
            </label>
            <label className="block">
              <span className="font-bold text-ink">
                {isTeacher ? "Teacher email" : "UP Mail"}
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
                placeholder={isTeacher ? "teacher@up.edu.ph" : "name@up.edu.ph"}
              />
            </label>
            <label className="block">
              <span className="font-bold text-ink">Contact number</span>
              <input
                required
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
                placeholder="0917 123 4567"
              />
            </label>
            <label className="block">
              <span className="font-bold text-ink">
                {isTeacher ? "Department or office" : "Course and year level"}
              </span>
              <input
                value={affiliation}
                onChange={(event) => setAffiliation(event.target.value)}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
                placeholder={isTeacher ? "Department of Food Science" : "BS Food Tech, 2nd year"}
              />
            </label>
          </div>

          {!isTeacher ? (
            <label className="mt-4 block">
              <span className="font-bold text-ink">Form 5 upload</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(event) => setForm5Name(event.target.files?.[0]?.name ?? "")}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-maroon file:px-4 file:py-2 file:font-black file:text-white focus:border-maroon"
              />
              {form5Name ? (
                <span className="mt-2 block text-sm font-bold text-forest">{form5Name}</span>
              ) : null}
            </label>
          ) : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-black text-white transition hover:bg-maroon/90"
          >
            Save {isTeacher ? "teacher" : "student"} profile
          </button>
          </form>

          <aside className="space-y-4">
          <div className="rounded-lg bg-white/95 p-6 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
            <h2 className="font-display text-4xl leading-none text-maroon">Guest mode</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Guests can browse kiosks and view menus. Adding food to cart and checkout
              require a student or teacher login.
            </p>
            <Link
              href="/restaurants"
              className="mt-5 inline-flex rounded-full border border-maroon/20 bg-cream px-5 py-3 font-black text-maroon"
            >
              Browse menus
            </Link>
          </div>

          <div className="rounded-lg border border-gold/40 bg-forest/95 p-6 text-white shadow-xl backdrop-blur-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
              Store staff
            </p>
            <h2 className="font-display mt-2 text-4xl leading-none">Merchant view</h2>
            <p className="mt-3 text-sm leading-6 text-white/82">
              Staff can manage kiosk orders, pickup status, and store availability from a
              separate merchant login.
            </p>
            <Link
              href="/merchant/login"
              className="mt-5 inline-flex rounded-md bg-gold px-5 py-3 font-black text-maroon transition hover:bg-white"
            >
              Go to merchant login
            </Link>
          </div>

          <div className="rounded-lg bg-maroon/95 p-6 text-white shadow-xl backdrop-blur-sm">
            <h2 className="font-display text-4xl leading-none">What gets saved</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-white/82">
              <li>Name and contact number</li>
              <li>Optional course, year level, or department</li>
              <li>Saved orders and order history</li>
              <li>Notification preferences</li>
            </ul>
          </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
