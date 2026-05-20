"use client";

import { useMemo, useState } from "react";
import { FoodImage } from "./FoodImage";
import { MenuSection } from "./MenuSection";
import type { MenuItem } from "@/lib/types";

export function MenuBrowser({
  menu,
  restaurantId,
  restaurantName,
  viewOnly = false,
}: {
  menu: MenuItem[];
  restaurantId: string;
  restaurantName: string;
  viewOnly?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const showTessComboGuide = restaurantId === "tess-store";

  const categories = useMemo(
    () => Array.from(new Set(menu.map((item) => item.category))),
    [menu],
  );
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredItems = useMemo(
    () =>
      menu.filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch =
          !normalizedSearch ||
          [item.name, item.description, item.category]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);

        return matchesCategory && matchesSearch;
      }),
    [menu, normalizedSearch, selectedCategory],
  );

  const visibleCategories = categories
    .map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category),
    }))
    .filter((section) => section.items.length > 0);

  const buttonBase =
    "inline-flex min-h-11 max-w-[calc(100vw-3rem)] shrink-0 items-center justify-center rounded-md border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/40";

  return (
    <div className="min-w-0 space-y-8">
      <section className="min-w-0 rounded-lg border border-maroon/10 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase text-gold-dark">Menu sections</p>
            <h2 className="font-display mt-1 text-3xl leading-none text-maroon sm:text-4xl">
              Pick a category
            </h2>
          </div>
          <label className="block">
            <span className="text-sm font-bold text-ink/70">Search this kiosk</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search meals, drinks, snacks"
              className="mt-2 h-12 w-full rounded-md border border-maroon/15 bg-cream px-4 text-sm font-semibold outline-none transition placeholder:text-ink/40 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-gold/25"
            />
          </label>
        </div>

        <div
          className="-mx-4 mt-5 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 sm:mx-0 sm:max-w-full sm:px-0"
          aria-label="Filter menu category"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`${buttonBase} ${
              selectedCategory === "All"
                ? "border-maroon bg-maroon text-white"
                : "border-maroon/15 bg-cream text-maroon hover:bg-white"
            }`}
          >
            All
            <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">{menu.length}</span>
          </button>
          {categories.map((category) => {
            const count = menu.filter((item) => item.category === category).length;
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`${buttonBase} ${
                  active
                    ? "border-maroon bg-maroon text-white"
                    : "border-maroon/15 bg-cream text-maroon hover:bg-white"
                }`}
              >
                {category}
                <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm font-semibold text-ink/60">
          Showing {filteredItems.length} of {menu.length} items
          {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
          {normalizedSearch ? ` matching "${searchTerm.trim()}"` : ""}.
        </p>
      </section>

      {showTessComboGuide ? (
        <div className="min-w-0 overflow-hidden rounded-lg border border-maroon/10 bg-cream shadow-sm ring-1 ring-white/70">
          <FoodImage
            src="/images/stores/tess-store-combo-meals.png"
            fallbackSrc="/images/tess-store.jpg"
            alt="Tess' Store combo meals category guide"
            className="aspect-[16/9] w-full object-cover"
            priority
          />
        </div>
      ) : null}

      {visibleCategories.length > 0 ? (
        <div className="space-y-10">
          {visibleCategories.map(({ category, items }) => (
            <MenuSection
              key={category}
              category={category}
              items={items}
              restaurantId={restaurantId}
              restaurantName={restaurantName}
              viewOnly={viewOnly}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-maroon/10 bg-white p-8 text-center shadow-sm">
          <h2 className="font-display text-4xl leading-none text-maroon">No matches</h2>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            Try another category or search term for this kiosk.
          </p>
        </div>
      )}
    </div>
  );
}
