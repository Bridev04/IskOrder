"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getRestaurant } from "@/lib/api";
import { formatPeso } from "@/lib/format";
import type { MenuItem, MerchantOrder, MerchantOrderStatus } from "@/lib/types";

type MerchantSession = {
  username: string;
  storeName: string;
  signedInAt: string;
};

type StockItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type MerchantDashboardPanel = "orders" | "inventory";

const merchantOrdersStorageKey = "iskorder-merchant-orders";

const initialOrders: MerchantOrder[] = [
  {
    id: "ISK-24A91F",
    restaurantId: "tess-store",
    restaurantName: "Tess' Store",
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
    restaurantId: "chicken-city",
    restaurantName: "Chicken City - Area 2",
    studentName: "Rafa Dizon",
    pickupTime: "1:00 PM",
    status: "Preparing",
    items: [{ name: "Daegu", quantity: 2, price: 99 }],
  },
  {
    id: "ISK-18BD77",
    restaurantId: "econ-lounge",
    restaurantName: "The Food Nook - Econ Lounge",
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
const merchantOrderStatuses = new Set(Object.keys(statusStyles));

const storeIdsByName: Record<string, string> = {
  "Tess' Store": "tess-store",
  "Chicken City - Area 2": "chicken-city",
  "The Food Nook - Econ Lounge": "econ-lounge",
};
const dashboardPanelButtonBase =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-md border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40 sm:flex-none";
const stockCategoryButtonBase =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40";

function getDefaultStock(item: MenuItem) {
  return item.price > 0 ? 12 : 0;
}

function getStoredMerchantOrders() {
  const savedOrders = window.localStorage.getItem(merchantOrdersStorageKey);
  if (!savedOrders) {
    return [];
  }

  try {
    const parsedOrders = JSON.parse(savedOrders) as MerchantOrder[];
    return Array.isArray(parsedOrders)
      ? parsedOrders.filter(
          (order) =>
            typeof order.id === "string" &&
            typeof order.restaurantId === "string" &&
            typeof order.studentName === "string" &&
            typeof order.pickupTime === "string" &&
            merchantOrderStatuses.has(order.status) &&
            Array.isArray(order.items),
        )
      : [];
  } catch {
    window.localStorage.removeItem(merchantOrdersStorageKey);
    return [];
  }
}

function getMerchantOrdersForStore(storeId: string) {
  const storedOrders = getStoredMerchantOrders();
  const storedOrderIds = new Set(storedOrders.map((order) => order.id));

  return [...storedOrders, ...initialOrders.filter((order) => !storedOrderIds.has(order.id))]
    .filter((order) => order.restaurantId === storeId)
    .sort((a, b) => a.pickupTime.localeCompare(b.pickupTime));
}

export default function MerchantPage() {
  const [session, setSession] = useState<MerchantSession | null>(null);
  const [checkedSession, setCheckedSession] = useState(false);
  const [orders, setOrders] = useState<MerchantOrder[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [stockLoaded, setStockLoaded] = useState(false);
  const [stockLoading, setStockLoading] = useState(false);
  const [stockError, setStockError] = useState("");
  const [stockSearch, setStockSearch] = useState("");
  const [selectedStockCategory, setSelectedStockCategory] = useState("All");
  const [activePanel, setActivePanel] = useState<MerchantDashboardPanel>("orders");
  const storeId = session ? storeIdsByName[session.storeName] ?? "tess-store" : "";
  const stockStorageKey = storeId ? `iskorder-stock-${storeId}` : "";

  useEffect(() => {
    // TODO: Replace mock merchant session with real server-side role-based authentication.
    const savedSession = window.localStorage.getItem("iskorder-merchant-session");
    if (savedSession) {
      setSession(JSON.parse(savedSession) as MerchantSession);
    }
    setCheckedSession(true);
  }, []);

  useEffect(() => {
    if (!storeId) {
      setOrders([]);
      return;
    }

    setOrders(getMerchantOrdersForStore(storeId));
  }, [storeId]);

  useEffect(() => {
    if (!storeId) {
      return;
    }

    setStockLoading(true);
    setStockLoaded(false);
    setStockError("");
    setSelectedStockCategory("All");

    getRestaurant(storeId)
      .then((restaurant) => {
        const savedStock = window.localStorage.getItem(`iskorder-stock-${storeId}`);
        const savedQuantities = new Map<string, number>();

        if (savedStock) {
          try {
            const parsedStock = JSON.parse(savedStock) as StockItem[];
            if (Array.isArray(parsedStock)) {
              parsedStock.forEach((item) => {
                if (typeof item.id === "string" && typeof item.quantity === "number") {
                  savedQuantities.set(item.id, item.quantity);
                }
              });
            }
          } catch {
            window.localStorage.removeItem(`iskorder-stock-${storeId}`);
          }
        }

        setStockItems(
          restaurant.menu.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: savedQuantities.get(item.id) ?? getDefaultStock(item),
          })),
        );
        setStockLoaded(true);
      })
      .catch(() => {
        setStockItems([]);
        setStockError("Could not load stock list.");
        setStockLoaded(true);
      })
      .finally(() => setStockLoading(false));
  }, [storeId]);

  useEffect(() => {
    if (stockStorageKey && stockLoaded) {
      window.localStorage.setItem(stockStorageKey, JSON.stringify(stockItems));
    }
  }, [stockItems, stockLoaded, stockStorageKey]);

  const activeOrders = useMemo(
    () => orders.filter((order) => order.status !== "Completed" && order.status !== "Cancelled"),
    [orders],
  );

  const stockSummary = useMemo(
    () => ({
      total: stockItems.reduce((sum, item) => sum + item.quantity, 0),
      low: stockItems.filter((item) => item.quantity > 0 && item.quantity <= 3).length,
      out: stockItems.filter((item) => item.quantity === 0).length,
    }),
    [stockItems],
  );

  const stockCategories = useMemo(
    () => Array.from(new Set(stockItems.map((item) => item.category))),
    [stockItems],
  );

  const stockCategoryCounts = useMemo(
    () =>
      stockItems.reduce<Record<string, number>>((counts, item) => {
        counts[item.category] = (counts[item.category] ?? 0) + 1;
        return counts;
      }, {}),
    [stockItems],
  );

  const normalizedStockSearch = stockSearch.trim().toLowerCase();

  const filteredStockItems = useMemo(() => {
    return stockItems.filter((item) => {
      const matchesCategory =
        selectedStockCategory === "All" || item.category === selectedStockCategory;
      const matchesSearch =
        !normalizedStockSearch ||
        [item.name, item.category].join(" ").toLowerCase().includes(normalizedStockSearch);

      return matchesCategory && matchesSearch;
    });
  }, [normalizedStockSearch, selectedStockCategory, stockItems]);

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

    const storedOrders = getStoredMerchantOrders();
    const hasStoredOrder = storedOrders.some((order) => order.id === orderId);

    if (hasStoredOrder) {
      window.localStorage.setItem(
        merchantOrdersStorageKey,
        JSON.stringify(
          storedOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        ),
      );
    }
  }

  function updateStock(itemId: string, change: number) {
    setStockItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      ),
    );
  }

  function setStockQuantity(itemId: string, quantity: number) {
    setStockItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item,
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
            href={`/restaurants/${storeId}?view=merchant`}
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

      <div
        className="mb-6 flex flex-wrap gap-2"
        aria-label="Switch merchant dashboard section"
      >
        <button
          type="button"
          onClick={() => setActivePanel("orders")}
          className={`${dashboardPanelButtonBase} ${
            activePanel === "orders"
              ? "border-maroon bg-maroon text-white"
              : "border-maroon/15 bg-white text-maroon hover:bg-cream"
          }`}
        >
          Current orders
          <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">
            {activeOrders.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("inventory")}
          className={`${dashboardPanelButtonBase} ${
            activePanel === "inventory"
              ? "border-maroon bg-maroon text-white"
              : "border-maroon/15 bg-white text-maroon hover:bg-cream"
          }`}
        >
          Menu inventory
          <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">
            {stockItems.length}
          </span>
        </button>
      </div>

      {activePanel === "inventory" ? (
      <section className="mb-6 rounded-lg bg-white p-5 shadow-sm ring-1 ring-maroon/10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-gold-dark">Stock tracker</p>
            <h2 className="font-display mt-1 text-4xl leading-none text-maroon">
              Menu inventory
            </h2>
          </div>
          <label className="w-full sm:w-72">
            <span className="text-sm font-bold text-ink/70">Find item</span>
            <input
              type="search"
              value={stockSearch}
              onChange={(event) => setStockSearch(event.target.value)}
              placeholder="Search menu stock"
              className="mt-2 h-11 w-full rounded-md border border-maroon/15 bg-cream px-4 text-sm font-semibold outline-none transition placeholder:text-ink/40 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-gold/25"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-cream p-4">
            <p className="text-xs font-black uppercase text-ink/55">Total units</p>
            <p className="mt-1 text-3xl font-black text-maroon">{stockSummary.total}</p>
          </div>
          <div className="rounded-lg bg-cream p-4">
            <p className="text-xs font-black uppercase text-ink/55">Low stock</p>
            <p className="mt-1 text-3xl font-black text-maroon">{stockSummary.low}</p>
          </div>
          <div className="rounded-lg bg-cream p-4">
            <p className="text-xs font-black uppercase text-ink/55">Out of stock</p>
            <p className="mt-1 text-3xl font-black text-maroon">{stockSummary.out}</p>
          </div>
        </div>

        {stockError ? (
          <p className="mt-4 rounded-md bg-maroon/10 px-3 py-2 text-sm font-bold text-maroon">
            {stockError}
          </p>
        ) : null}

        <div className="mt-5 border-t border-maroon/10 pt-5">
          <p className="text-xs font-black uppercase text-gold-dark">Menu sections</p>
          <h3 className="font-display mt-1 text-3xl leading-none text-maroon">
            Pick a category
          </h3>
          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1"
            aria-label="Filter inventory category"
          >
            <button
              type="button"
              onClick={() => setSelectedStockCategory("All")}
              className={`${stockCategoryButtonBase} ${
                selectedStockCategory === "All"
                  ? "border-maroon bg-maroon text-white"
                  : "border-maroon/15 bg-cream text-maroon hover:bg-white"
              }`}
            >
              All
              <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">
                {stockItems.length}
              </span>
            </button>
            {stockCategories.map((category) => {
              const active = selectedStockCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedStockCategory(category)}
                  className={`${stockCategoryButtonBase} ${
                    active
                      ? "border-maroon bg-maroon text-white"
                      : "border-maroon/15 bg-cream text-maroon hover:bg-white"
                  }`}
                >
                  {category}
                  <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">
                    {stockCategoryCounts[category] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm font-semibold text-ink/60">
            Showing {filteredStockItems.length} of {stockItems.length} items
            {selectedStockCategory !== "All" ? ` in ${selectedStockCategory}` : ""}
            {normalizedStockSearch ? ` matching "${stockSearch.trim()}"` : ""}.
          </p>
        </div>

        <div className="mt-5 max-h-[460px] space-y-3 overflow-y-auto pr-1">
          {stockLoading ? (
            <p className="rounded-lg bg-cream p-4 text-sm font-bold text-ink/65">
              Loading menu stock...
            </p>
          ) : null}

          {!stockLoading && filteredStockItems.length === 0 ? (
            <p className="rounded-lg bg-cream p-4 text-sm font-bold text-ink/65">
              No stock items match your search.
            </p>
          ) : null}

          {filteredStockItems.map((item) => {
            const stockStatus =
              item.quantity === 0 ? "Out" : item.quantity <= 3 ? "Low" : "In stock";
            const stockClass =
              item.quantity === 0
                ? "bg-stone text-ink"
                : item.quantity <= 3
                  ? "bg-gold text-maroon"
                  : "bg-forest text-white";

            return (
              <article
                key={item.id}
                className="grid gap-4 rounded-lg border border-maroon/10 bg-cream p-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-ink">{item.name}</h3>
                    <span className={`rounded-md px-2 py-1 text-xs font-black uppercase ${stockClass}`}>
                      {stockStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-ink/60">
                    {item.category} - {formatPeso(item.price)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => updateStock(item.id, -1)}
                    className="h-10 w-10 rounded-md border border-maroon/20 bg-white text-lg font-black text-maroon"
                    aria-label={`Remove one ${item.name}`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(event) =>
                      setStockQuantity(item.id, Number(event.target.value) || 0)
                    }
                    className="h-10 w-20 rounded-md border border-maroon/15 bg-white text-center text-sm font-black text-ink outline-none focus:border-maroon focus:ring-4 focus:ring-gold/25"
                    aria-label={`${item.name} stock quantity`}
                  />
                  <button
                    type="button"
                    onClick={() => updateStock(item.id, 1)}
                    className="h-10 w-10 rounded-md bg-maroon text-lg font-black text-white"
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setStockQuantity(item.id, 0)}
                    className="h-10 rounded-md border border-maroon/20 bg-white px-3 text-sm font-black text-maroon"
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      ) : null}

      {activePanel === "orders" ? (
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
      ) : null}
    </div>
  );
}
