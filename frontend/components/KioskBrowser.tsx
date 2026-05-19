"use client";

import { useMemo, useState } from "react";
import { RestaurantCard } from "@/components/RestaurantCard";
import type { Restaurant } from "@/lib/types";

function getSearchText(restaurant: Restaurant) {
  return [
    restaurant.name,
    restaurant.category,
    restaurant.description,
    restaurant.location,
    restaurant.status,
    restaurant.availability,
    restaurant.wait_time,
    ...restaurant.menu.flatMap((item) => [
      item.name,
      item.description,
      item.category,
      item.availability,
    ]),
    ...restaurant.recommended_orders.flatMap((order) => [order.name, order.description]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function KioskBrowser({ restaurants }: { restaurants: Restaurant[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredRestaurants = useMemo(() => {
    if (!normalizedQuery) {
      return restaurants;
    }

    return restaurants.filter((restaurant) =>
      getSearchText(restaurant).includes(normalizedQuery),
    );
  }, [normalizedQuery, restaurants]);

  return (
    <section aria-label="Browse kiosks">
      <label htmlFor="kiosk-search" className="block text-sm font-black uppercase text-maroon">
        Search kiosks
      </label>
      <div className="mt-3 flex min-h-12 overflow-hidden rounded-md border border-maroon/15 bg-white shadow-sm focus-within:border-maroon focus-within:ring-4 focus-within:ring-gold/25">
        <input
          id="kiosk-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by kiosk, food, drink, or location"
          className="min-w-0 flex-1 px-4 text-base font-semibold text-ink outline-none placeholder:text-ink/42"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="border-l border-maroon/10 px-4 text-sm font-black text-maroon transition hover:bg-cream"
          >
            Clear
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-semibold text-ink/60">
        Showing {filteredRestaurants.length} of {restaurants.length} kiosks
      </p>

      {filteredRestaurants.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-maroon/10 bg-white p-8 text-center shadow-sm">
          <h2 className="font-display text-4xl leading-none text-maroon">No kiosks found</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/65">
            Try searching for a kiosk name, menu item, drink, or campus location.
          </p>
        </div>
      )}
    </section>
  );
}
