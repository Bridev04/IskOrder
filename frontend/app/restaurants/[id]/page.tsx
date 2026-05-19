import Link from "next/link";
import { notFound } from "next/navigation";
import { AddRecommendedOrderButton } from "@/components/AddRecommendedOrderButton";
import { FoodImage } from "@/components/FoodImage";
import { MenuBrowser } from "@/components/MenuBrowser";
import { getRestaurant } from "@/lib/api";
import { formatPeso } from "@/lib/format";
import type { Restaurant } from "@/lib/types";

export default async function RestaurantDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ view?: string }>;
}) {
  let restaurant: Restaurant;
  const { id } = await params;
  const view = (await searchParams)?.view;
  const isMerchantView = view === "merchant";

  try {
    restaurant = await getRestaurant(id);
  } catch {
    notFound();
  }

  function getRecommendedOrderTotal(
    recommendedOrder: (typeof restaurant.recommended_orders)[number],
  ) {
    return recommendedOrder.items.reduce((sum, recommendedItem) => {
      const menuItem = restaurant.menu.find(
        (item) => item.id === recommendedItem.menu_item_id,
      );
      return sum + (menuItem?.price || 0) * recommendedItem.quantity;
    }, 0);
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <FoodImage
          src={restaurant.headerImage ?? restaurant.image}
          fallbackSrc={restaurant.fallbackImage ?? restaurant.image}
          alt={restaurant.name}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link
            href={isMerchantView ? "/merchant" : "/restaurants"}
            className="font-bold text-gold hover:text-white"
          >
            {isMerchantView ? "Back to dashboard" : "Back to restaurants"}
          </Link>
          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-black uppercase text-gold">
              {restaurant.category}
            </p>
            <h1 className="font-display mt-3 text-5xl leading-none text-white sm:text-6xl">
              {restaurant.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/80">{restaurant.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-forest px-4 py-2 text-sm font-black text-white">
                {restaurant.status ?? "Open now"}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
                {restaurant.wait_time ?? "15-20 min"}
              </span>
              <span className="rounded-full bg-gold px-4 py-2 text-sm font-black text-maroon">
                {restaurant.availability ?? "Available today"}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
                {restaurant.location}
              </span>
              {restaurant.service_types.map((serviceType) => (
                <span
                  key={serviceType}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-black capitalize text-maroon"
                >
                  {serviceType}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <MenuBrowser
          menu={restaurant.menu}
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          viewOnly={isMerchantView}
        />

        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm ring-1 ring-maroon/10 lg:sticky lg:top-24">
          <p className="text-sm font-black uppercase text-gold-dark">
            Recommended orders
          </p>
          <h2 className="font-display mt-2 text-4xl leading-none text-maroon">
            Try a ready-made set
          </h2>
          <div className="mt-5 space-y-4">
            {restaurant.recommended_orders.map((recommendedOrder) => (
              <div
                key={recommendedOrder.id}
                className="rounded-lg border border-maroon/10 bg-cream p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-ink">{recommendedOrder.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-ink/65">
                      {recommendedOrder.description}
                    </p>
                  </div>
                  <p className="shrink-0 font-black text-maroon">
                    {formatPeso(getRecommendedOrderTotal(recommendedOrder))}
                  </p>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-ink/70">
                  {recommendedOrder.items.map((recommendedItem) => {
                    const menuItem = restaurant.menu.find(
                      (item) => item.id === recommendedItem.menu_item_id,
                    );
                    return (
                      <li key={recommendedItem.menu_item_id}>
                        {recommendedItem.quantity}x {menuItem?.name}
                      </li>
                    );
                  })}
                </ul>
                {!isMerchantView ? (
                  <div className="mt-4">
                    <AddRecommendedOrderButton
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.name}
                      menu={restaurant.menu}
                      recommendedOrder={recommendedOrder}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {!isMerchantView ? (
            <>
              <div className="mt-5 rounded-lg bg-maroon/5 p-4">
                <h3 className="font-black text-maroon">One restaurant per cart</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">
                  Adding from another restaurant starts a new cart so checkout stays quick
                  and organized.
                </p>
              </div>
              <Link
                href="/cart"
                className="mt-5 inline-flex rounded-full bg-maroon px-5 py-3 font-black text-white hover:bg-maroon/90"
              >
                Go to cart
              </Link>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
