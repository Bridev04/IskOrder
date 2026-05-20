"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCustomerProfile, type CustomerProfile } from "@/lib/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    setProfile(getCustomerProfile());
  }, []);

  if (!profile) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Student profile</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">No profile yet</h1>
        <p className="mt-4 text-ink/65">Create a student or teacher profile before checkout.</p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white sm:w-auto"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Account profile</p>
          <h1 className="font-display mt-2 break-words text-4xl leading-none text-maroon sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-ink/65">
            {profile.email} - {profile.role === "teacher" ? "Teacher" : "Student"}
          </p>
        </div>
        <Link
          href="/restaurants"
          className="inline-flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white sm:w-auto"
        >
          Order food
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-maroon/10 sm:p-6">
          <h2 className="font-display text-4xl leading-none text-maroon">Profile details</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div>
              <p className="font-black text-ink">
                {profile.role === "teacher" ? "Department or office" : "Course and year level"}
              </p>
              <p className="mt-1 text-ink/65">
                {profile.role === "teacher"
                  ? profile.department || "Not provided"
                  : profile.courseYear || "Not provided"}
              </p>
            </div>
            <div>
              <p className="font-black text-ink">Contact number</p>
              <p className="mt-1 text-ink/65">{profile.contactNumber}</p>
            </div>
            <div>
              <p className="font-black text-ink">Verification</p>
              <p className="mt-1 text-ink/65">{profile.verificationStatus}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Saved orders",
              text: "Solo Tapa Break and After-Class Ihaw are ready to repeat from kiosk pages.",
            },
            {
              title: "Order history",
              text: "Recent orders appear after checkout so students and teachers can track repeats and ratings.",
            },
            {
              title: "Notification settings",
              text: "Pickup alerts, delay notices, and ready-for-pickup updates are enabled.",
            },
            {
              title: "Recommendations",
              text: "Suggestions can use order history, available time, wait times, and location.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
              <h2 className="text-xl font-black text-maroon">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">{item.text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
