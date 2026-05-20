"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { getLoginRedirect, hasCustomerProfile } from "@/lib/auth";
import type { MenuItem } from "@/lib/types";

export function AddToCartButton({
  restaurantId,
  restaurantName,
  item,
}: {
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const canOrder = item.price > 0;

  useEffect(() => {
    setIsLoggedIn(hasCustomerProfile());
  }, []);

  function handleAdd() {
    if (!canOrder) {
      return;
    }

    if (!isLoggedIn) {
      window.location.href = getLoginRedirect(
        window.location.pathname,
        window.location.search,
      );
      return;
    }

    addItem(restaurantId, restaurantName, item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!canOrder}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-maroon px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-gold hover:text-maroon focus:outline-none focus:ring-4 focus:ring-gold/40 disabled:cursor-not-allowed disabled:bg-stone disabled:text-ink/55 disabled:shadow-none sm:w-auto"
    >
      {!canOrder ? "Ask kiosk" : !isLoggedIn ? "Log in to order" : added ? "Ordered" : "Add order"}
    </button>
  );
}
