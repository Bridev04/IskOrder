import { AddToCartButton } from "./AddToCartButton";
import { FoodImage } from "./FoodImage";
import { formatPeso } from "@/lib/format";
import type { MenuItem } from "@/lib/types";

function getMenuBadges(item: MenuItem) {
  const badges = new Set<string>();

  if (item.price > 0 && item.price <= 100) {
    badges.add("Budget meal");
  }
  if (item.name.toLowerCase().includes("combo")) {
    badges.add("Combo");
  }
  if (item.description.toLowerCase().includes("share") || item.category === "For Sharing") {
    badges.add("For sharing");
  }

  return Array.from(badges);
}

function getAvailability(item: MenuItem) {
  if (item.price <= 0) {
    return {
      label: item.availability ?? "Ask kiosk",
      detail: "This item can be checked at the counter before ordering.",
      className: "bg-stone text-ink",
    };
  }

  return {
    label: item.availability ?? "Available now",
    detail: "Ready for pickup ordering today.",
    className: "bg-forest text-white",
  };
}

export function MenuSection({
  category,
  items,
  restaurantId,
  restaurantName,
  viewOnly = false,
}: {
  category: string;
  items: MenuItem[];
  restaurantId: string;
  restaurantName: string;
  viewOnly?: boolean;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display border-l-4 border-gold pl-3 text-3xl leading-none text-maroon sm:text-4xl">
        {category}
      </h2>
      <div className="grid gap-4">
        {items.map((item) => (
          (() => {
            const availability = getAvailability(item);
            const badges = getMenuBadges(item);

            return (
              <article
                key={item.id}
                className="grid gap-4 rounded-lg border border-maroon/10 bg-white p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]"
              >
                <FoodImage
                  src={item.image}
                  fallbackSrc={item.fallbackImage}
                  alt={item.name}
                  className="h-40 w-full rounded-md object-cover sm:h-24 sm:w-24"
                />
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-black text-ink">{item.name}</h3>
                    <p className="font-black text-maroon">{formatPeso(item.price)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-black uppercase ${availability.className}`}
                    >
                      {availability.label}
                    </span>
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-md bg-maroon/10 px-2 py-1 text-xs font-black uppercase text-maroon"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs font-bold text-ink/55">{availability.detail}</p>
                </div>
                {!viewOnly ? (
                  <div className="flex w-full items-center sm:w-auto sm:justify-end">
                    <AddToCartButton
                      restaurantId={restaurantId}
                      restaurantName={restaurantName}
                      item={item}
                    />
                  </div>
                ) : null}
              </article>
            );
          })()
        ))}
      </div>
    </section>
  );
}
