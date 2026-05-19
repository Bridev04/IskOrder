"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { getLoginRedirect, hasCustomerProfile } from "@/lib/auth";
import type { MenuItem, RecommendedOrder } from "@/lib/types";

export function AddRecommendedOrderButton({
  restaurantId,
  restaurantName,
  menu,
  recommendedOrder,
}: {
  restaurantId: string;
  restaurantName: string;
  menu: MenuItem[];
  recommendedOrder: RecommendedOrder;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(hasCustomerProfile());
  }, []);

  function handleAddRecommendedOrder() {
    if (!isLoggedIn) {
      window.location.href = getLoginRedirect(
        window.location.pathname,
        window.location.search,
      );
      return;
    }

    recommendedOrder.items.forEach((recommendedItem) => {
      const menuItem = menu.find((item) => item.id === recommendedItem.menu_item_id);
      if (!menuItem) {
        return;
      }

      for (let count = 0; count < recommendedItem.quantity; count += 1) {
        addItem(restaurantId, restaurantName, menuItem);
      }
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAddRecommendedOrder}
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-black text-maroon shadow-sm transition hover:bg-maroon hover:text-white focus:outline-none focus:ring-4 focus:ring-gold/40"
    >
      {!isLoggedIn ? "Log in to order" : added ? "Ordered set" : "Order set"}
    </button>
  );
}
