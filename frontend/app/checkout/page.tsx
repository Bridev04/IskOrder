"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { createOrder, getRestaurant } from "@/lib/api";
import { formatPeso } from "@/lib/format";
import type {
  MerchantOrder,
  PaymentMethod,
  Restaurant,
  ServiceType,
} from "@/lib/types";

const paymentMethods: PaymentMethod[] = ["GCash", "InstaPay"];
const merchantOrdersStorageKey = "iskorder-merchant-orders";

function formatPickupTime(date: Date) {
  return date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function generatePickupOptions() {
  const now = new Date();
  const firstSlot = new Date(now);
  firstSlot.setMinutes(Math.ceil((now.getMinutes() + 15) / 15) * 15, 0, 0);

  const closingSlot = new Date(now);
  closingSlot.setHours(16, 0, 0, 0);

  const slots: string[] = [];
  for (
    const slot = new Date(firstSlot);
    slot <= closingSlot;
    slot.setMinutes(slot.getMinutes() + 15)
  ) {
    slots.push(formatPickupTime(slot));
  }

  if (slots.length === 0) {
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(9, 0, 0, 0);
    slots.push(`Tomorrow, ${formatPickupTime(nextDay)}`);
    nextDay.setMinutes(nextDay.getMinutes() + 15);
    slots.push(`Tomorrow, ${formatPickupTime(nextDay)}`);
  }

  return slots;
}

function saveMerchantOrder(order: MerchantOrder) {
  const savedOrders = window.localStorage.getItem(merchantOrdersStorageKey);
  let merchantOrders: MerchantOrder[] = [];

  if (savedOrders) {
    try {
      const parsedOrders = JSON.parse(savedOrders);
      merchantOrders = Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch {
      merchantOrders = [];
    }
  }

  const nextOrders = [
    order,
    ...merchantOrders.filter((merchantOrder) => merchantOrder.id !== order.id),
  ];
  window.localStorage.setItem(merchantOrdersStorageKey, JSON.stringify(nextOrders));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, loaded, totalPrice, clearCart } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("pickup");
  const pickupOptions = useMemo(() => generatePickupOptions(), []);
  const [pickupTime, setPickupTime] = useState(pickupOptions[0] ?? "12:45 PM");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("GCash");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedProfile = window.localStorage.getItem("iskorder-profile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile) as {
        name?: string;
        contactNumber?: string;
      };
      setCustomerName(profile.name ?? "");
      setContactNumber(profile.contactNumber ?? "");
    }
  }, []);

  useEffect(() => {
    const restaurantId = items[0]?.restaurantId;
    if (!restaurantId) {
      setRestaurant(null);
      return;
    }

    setError("");
    getRestaurant(restaurantId)
      .then((data) => {
        setRestaurant(data);
        setServiceType(data.service_types[0]);
      })
      .catch(() => {
        setRestaurant(null);
        setError("Could not load restaurant details.");
      });
  }, [items]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!restaurant) {
      setError("Could not load restaurant details.");
      return;
    }

    setSubmitting(true);

    try {
      const order = await createOrder({
        customer_name: customerName,
        restaurant_id: restaurant.id,
        service_type: serviceType,
        contact_number: contactNumber,
        pickup_time: pickupTime,
        payment_method: paymentMethod,
        items: items.map((cartItem) => ({
          menu_item_id: cartItem.item.id,
          name: cartItem.item.name,
          quantity: cartItem.quantity,
          price: cartItem.item.price,
        })),
        total_price: totalPrice,
        notes,
      });

      saveMerchantOrder({
        id: order.order_id,
        restaurantId: order.restaurant.id,
        restaurantName: order.restaurant.name,
        studentName: order.order.customer_name,
        pickupTime: order.order.pickup_time,
        paymentMethod: order.order.payment_method,
        notes: order.order.notes,
        items: order.order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        status: "Pending",
      });
      window.sessionStorage.setItem("iskorder-last-order", JSON.stringify(order));
      clearCart();
      router.push("/confirmation");
    } catch {
      setError("Could not place the order. Please try again.");
      setSubmitting(false);
    }
  }

  if (!loaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Checkout</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon">Loading checkout</h1>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Checkout</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon">No items to checkout</h1>
        <Link
          href="/restaurants"
          className="mt-8 inline-flex rounded-full bg-maroon px-6 py-3 font-black text-white"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-maroon/10">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Checkout</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon">Place your order</h1>

        <label className="mt-8 block">
          <span className="font-bold text-ink">Customer name</span>
          <input
            required
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
            placeholder="Juan dela Cruz"
          />
        </label>

        <label className="mt-6 block">
          <span className="font-bold text-ink">Contact number</span>
          <input
            required
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
            placeholder="0917 123 4567"
          />
        </label>

        <div className="mt-6">
          <p className="font-bold text-ink">Service type</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {restaurant?.service_types.map((type) => (
              <label
                key={type}
                className={`cursor-pointer rounded-lg border p-4 capitalize transition ${
                  serviceType === type
                    ? "border-maroon bg-maroon text-white"
                    : "border-maroon/15 bg-cream text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="serviceType"
                  value={type}
                  checked={serviceType === type}
                  onChange={() => setServiceType(type)}
                  className="sr-only"
                />
                <span className="font-black">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="mt-6 block">
          <span className="font-bold text-ink">Preferred pickup time</span>
          <select
            required
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
            className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
          >
            {pickupOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="mt-2 block text-sm text-ink/60">
            Earliest pickup is at least 15 minutes from now. Demo pickup slots run until 4:00 PM.
          </span>
        </label>

        <div className="mt-6">
          <p className="font-bold text-ink">Payment method</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label
                key={method}
                className={`cursor-pointer rounded-lg border p-4 transition ${
                  paymentMethod === method
                    ? "border-maroon bg-maroon text-white"
                    : "border-maroon/15 bg-cream text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="sr-only"
                />
                <span className="font-black">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="mt-6 block">
          <span className="font-bold text-ink">Special requests</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-2 min-h-32 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
            placeholder="Optional request, allergy note, or pickup reminder"
          />
        </label>

        {error ? <p className="mt-4 font-bold text-maroon">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting || !restaurant}
          className="mt-8 w-full rounded-full bg-maroon px-6 py-3 font-black text-white transition hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Placing order..." : !restaurant ? "Loading restaurant..." : "Place order"}
        </button>
      </form>

      <aside className="h-fit rounded-lg bg-white p-6 shadow-sm ring-1 ring-maroon/10">
        <h2 className="font-display text-4xl leading-none text-maroon">Order Summary</h2>
        <p className="mt-2 text-sm font-semibold text-ink/60">{items[0]?.restaurantName}</p>
        <div className="mt-5 space-y-4">
          {items.map((cartItem) => (
            <div key={cartItem.item.id} className="flex justify-between gap-4 text-sm">
              <span>
                {cartItem.quantity}x {cartItem.item.name}
              </span>
              <span className="font-bold">
                {formatPeso(cartItem.item.price * cartItem.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-maroon/10 pt-5 text-xl font-black">
          <span>Total</span>
          <span className="text-maroon">{formatPeso(totalPrice)}</span>
        </div>
        <div className="mt-5 rounded-lg bg-cream p-4 text-sm leading-6 text-ink/65">
          <p className="font-black text-maroon">Checkout flow</p>
          <p>1. Select kiosk and add items.</p>
          <p>2. Choose pickup time, payment, and special requests.</p>
          <p>3. Track preparation and pickup status after placing the order.</p>
        </div>
      </aside>
    </div>
  );
}
