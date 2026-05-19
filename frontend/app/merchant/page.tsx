"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPeso } from "@/lib/format";

type MerchantSession = {
  username: string;
  storeName: string;
  signedInAt: string;
};

type MerchantOrderStatus =
  | "Pending"
  | "Preparing"
  | "Ready for Pickup"
  | "Completed"
  | "Cancelled";

type MerchantOrder = {
  id: string;
  studentName: string;
  pickupTime: string;
  items: { name: string; quantity: number; price: number }[];
  status: MerchantOrderStatus;
};

const initialOrders: MerchantOrder[] = [
  {
    id: "ISK-24A91F",
    studentName: "Mika Santos",
    pickupTime: "12:45 PM",
    status: "Pending",
    items: [
      { name: "Combo 8", quantity: 1, price: 103 },
      { name: "Mountain Dew", quantity: 1, price: 25 },
    ],
  },
  {
    id: "ISK-81C02B",
    studentName: "Rafa Dizon",
    pickupTime: "1:00 PM",
    status: "Preparing",
    items: [{ name: "Daegu", quantity: 2, price: 99 }],
  },
  {
    id: "ISK-18BD77",
    studentName: "Aly Cruz",
    pickupTime: "1:15 PM",
    status: "Ready for Pickup",
    items: [{ name: "Strawberry lemonade", quantity: 1, price: 90 }],
  },
];

const nextStatus: Partial<Record<MerchantOrderStatus, MerchantOrderStatus>> = {
  Pending: "Preparing",
  Preparing: "Ready for Pickup",
  "Ready for Pickup": "Completed",
};

const statusStyles: Record<MerchantOrderStatus, string> = {
  Pending: "bg-gold text-maroon",
  Preparing: "bg-maroon text-white",
  "Ready for Pickup": "bg-forest text-white",
  Completed: "bg-stone text-ink",
  Cancelled: "bg-ink/10 text-ink",
};

export default function MerchantPage() {
  const [session, setSession] = useState<MerchantSession | null>(null);
  const [checkedSession, setCheckedSession] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // TODO: Replace mock merchant session with real server-side role-based authentication.
    const savedSession = window.localStorage.getItem("iskorder-merchant-session");
    if (savedSession) {
      setSession(JSON.parse(savedSession) as MerchantSession);
    }
    setCheckedSession(true);
  }, []);

  const activeOrders = useMemo(
    () => orders.filter((order) => order.status !== "Completed" && order.status !== "Cancelled"),
    [orders],
  );

  const totalOpenSales = useMemo(
    () =>
      activeOrders.reduce(
        (sum, order) =>
          sum +
          order.items.reduce(
            (orderSum, item) => orderSum + item.price * item.quantity,
            0,
          ),
        0,
      ),
    [activeOrders],
  );

  function updateOrderStatus(orderId: string, status: MerchantOrderStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  }

  function logout() {
    window.localStorage.removeItem("iskorder-merchant-session");
    setSession(null);
  }

  if (!checkedSession) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Merchant</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon">
          Loading kiosk desk
        </h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Merchant dashboard</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon">
          Staff login required
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Use the separate merchant login to manage kiosk orders, pickup times, and store
          availability.
        </p>
        <Link
          href="/merchant/login"
          className="mt-8 inline-flex rounded-md bg-maroon px-6 py-3 font-black text-white transition hover:bg-gold hover:text-maroon"
        >
          Go to merchant login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="font-black uppercase tracking-[0.2em] text-gold-dark">
            Merchant dashboard
          </p>
          <h1 className="font-display mt-2 text-5xl leading-none text-maroon sm:text-6xl">
            {session.storeName}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/70">
            Manage incoming pickup orders, prep status, and store availability from a kiosk-only
            workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/restaurants"
            className="inline-flex min-h-11 items-center rounded-md border border-maroon/20 bg-white px-4 text-sm font-black text-maroon"
          >
            View storefront
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-black text-white"
          >
            Log out
          </button>
        </div>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
          <p className="text-sm font-black uppercase text-gold-dark">Store status</p>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className={`mt-3 rounded-md px-4 py-2 text-sm font-black ${
              isOpen ? "bg-forest text-white" : "bg-stone text-ink"
            }`}
          >
            {isOpen ? "Open" : "Closed"}
          </button>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
          <p className="text-sm font-black uppercase text-gold-dark">Active orders</p>
          <p className="mt-2 text-4xl font-black text-maroon">{activeOrders.length}</p>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
          <p className="text-sm font-black uppercase text-gold-dark">Open queue total</p>
          <p className="mt-2 text-4xl font-black text-maroon">
            {formatPeso(totalOpenSales)}
          </p>
        </article>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-4xl leading-none text-maroon">
                Current orders
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Sorted by selected pickup time.
              </p>
            </div>
            <span className="rounded-md bg-cream px-3 py-2 text-xs font-black uppercase text-maroon">
              {session.username}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {orders.map((order) => {
              const total = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );
              const next = nextStatus[order.status];

              return (
                <article
                  key={order.id}
                  className="rounded-lg border border-maroon/10 bg-cream p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-ink">{order.id}</p>
                      <p className="mt-1 text-sm font-semibold text-ink/65">
                        {order.studentName} - pickup {order.pickupTime}
                      </p>
                    </div>
                    <span
                      className={`rounded-md px-3 py-1 text-xs font-black uppercase ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.name}`}
                        className="flex justify-between gap-4"
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-bold">
                          {formatPeso(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-maroon/10 pt-4">
                    <p className="font-black text-maroon">{formatPeso(total)}</p>
                    <div className="flex flex-wrap gap-2">
                      {next ? (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(order.id, next)}
                          className="rounded-md bg-maroon px-4 py-2 text-sm font-black text-white transition hover:bg-gold hover:text-maroon"
                        >
                          Mark as {next}
                        </button>
                      ) : null}
                      {order.status !== "Completed" && order.status !== "Cancelled" ? (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(order.id, "Cancelled")}
                          className="rounded-md border border-maroon/20 bg-white px-4 py-2 text-sm font-black text-maroon"
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="h-fit rounded-lg bg-maroon p-5 text-white shadow-sm">
          <h2 className="font-display text-4xl leading-none">Kiosk notes</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-white/82">
            <p>Use Pending for newly received orders.</p>
            <p>Move orders to Preparing once food or drinks are being made.</p>
            <p>Ready for Pickup means the student can claim at the counter.</p>
            <p>Completed keeps the order in the daily record without showing as active.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
