"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPeso } from "@/lib/format";
import type { OrderResponse } from "@/lib/types";

const trackerStages = ["Order received", "Preparing order", "Ready for pick up"];

export default function ConfirmationPage() {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [rating, setRating] = useState("5");

  useEffect(() => {
    const savedOrder = window.sessionStorage.getItem("iskorder-last-order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Confirmation</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">No recent order found</h1>
        <Link
          href="/restaurants"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white sm:w-auto"
        >
          Start another order
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-lg bg-white p-4 text-center shadow-soft ring-1 ring-maroon/10 sm:p-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-3xl font-black text-maroon">
          ✓
        </div>
        <p className="mt-6 font-black uppercase tracking-[0.2em] text-gold-dark">
          {order.status}
        </p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">Order {order.order_id}</h1>
        <p className="mt-4 text-ink/70">
          Estimated time: <span className="font-black">{order.estimated_time}</span>
        </p>
        <p className="mt-2 text-ink/70">
          Pickup time: <span className="font-black">{order.order.pickup_time}</span> via{" "}
          <span className="font-black">{order.order.payment_method}</span>
        </p>

        <div className="mt-8 rounded-lg bg-cream p-5 text-left">
          <h2 className="font-display text-3xl leading-none text-maroon">{order.restaurant.name}</h2>
          <p className="mt-1 text-sm text-ink/60">{order.restaurant.location}</p>
          <div className="mt-5 space-y-3">
            {order.order.items.map((item) => (
              <div key={item.menu_item_id} className="flex justify-between gap-4 text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-bold">{formatPeso(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-maroon/10 pt-5 text-lg font-black">
            <span>Total</span>
            <span className="text-maroon">{formatPeso(order.order.total_price)}</span>
          </div>
          {order.order.notes ? (
            <p className="mt-4 text-sm text-ink/65">Notes: {order.order.notes}</p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 text-left md:grid-cols-3">
          {trackerStages.map((stage, index) => (
            <div
              key={stage}
              className={`rounded-lg border p-4 ${
                index === 0
                  ? "border-maroon bg-maroon text-white"
                  : "border-maroon/10 bg-cream text-ink"
              }`}
            >
              <p className="text-xs font-black uppercase opacity-70">Step {index + 1}</p>
              <h2 className="mt-1 font-black">{stage}</h2>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
          <section className="rounded-lg bg-white p-5 ring-1 ring-maroon/10">
            <h2 className="font-display text-3xl leading-none text-maroon">Notifications</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-ink/68">
              <p>Your order is now being prepared.</p>
              <p>Kiosk is delayed by 10 minutes.</p>
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 ring-1 ring-maroon/10">
            <h2 className="font-display text-3xl leading-none text-maroon">Rate this order</h2>
            <label className="mt-4 block">
              <span className="text-sm font-bold text-ink">Rating</span>
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
              >
                <option value="5">5 - Great food and on-time pickup</option>
                <option value="4">4 - Good service</option>
                <option value="3">3 - Needs improvement</option>
              </select>
            </label>
            <textarea
              className="mt-3 min-h-24 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
              placeholder="Food quality, service, punctuality"
            />
          </section>
        </div>

        <Link
          href="/restaurants"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white hover:bg-maroon/90 sm:w-auto"
        >
          Order again
        </Link>
      </div>
    </div>
  );
}
