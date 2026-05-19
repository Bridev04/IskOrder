import Link from "next/link";
import { FoodImage } from "@/components/FoodImage";
import { getRestaurants } from "@/lib/api";
import { formatPeso } from "@/lib/format";

const homeFeatures = [
  {
    title: "Three real kiosks",
    text: "Browse ECON LOUNGE, Chicken City, and Tess' Store with the photos and menus you provided.",
  },
  {
    title: "Available now",
    text: "Kiosk and item availability labels sit beside every menu so students know what can be ordered.",
  },
  {
    title: "Pickup timing",
    text: "Each kiosk shows an estimated wait before checkout, with pickup slots starting later.",
  },
  {
    title: "Order status",
    text: "Add items, place a demo order, and see the received order confirmation immediately.",
  },
];

const kioskAccents = ["bg-forest", "bg-maroon", "bg-gold-dark"];
const baybayin = "ᜁ ᜐ᜔ ᜃ ᜂ ᜇ ᜒ ᜇ᜔";

export default async function HomePage() {
  const restaurants = await getRestaurants();
  const featuredItems = restaurants.flatMap((restaurant) =>
    restaurant.menu.slice(0, 2).map((item) => ({
      ...item,
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
    })),
  );

  const quickReorders = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.recommended_orders[0]?.name ?? `${restaurant.name} favorite`,
    description:
      restaurant.recommended_orders[0]?.description ??
      `Repeat a popular order from ${restaurant.name}.`,
    href: `/restaurants/${restaurant.id}`,
  }));

  return (
    <div className="overflow-hidden">
      <section
        className="relative isolate flex min-h-screen items-center bg-ink bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(24, 22, 18, 0.78) 0%, rgba(24, 22, 18, 0.46) 48%, rgba(24, 22, 18, 0.16) 100%), linear-gradient(180deg, rgba(24, 22, 18, 0.1) 0%, rgba(24, 22, 18, 0.55) 100%), url('/images/main.png')",
        }}
      >
        <div aria-hidden="true" className="baybayin-ribbon absolute inset-x-0 top-10 opacity-25">
          {baybayin} {baybayin} {baybayin} {baybayin}
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.42fr)] lg:items-center">
          <div className="max-w-4xl pb-4 text-white">
            <p className="font-display text-xl text-gold sm:text-2xl">UP Diliman campus eats</p>
            <h1 className="font-display mt-4 max-w-4xl text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              Built for busy Iskolars
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Order from ECON LOUNGE, Area 2 Chicken City, and Tess' Store with clear
              availability, pickup timing, and a simple order confirmation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/restaurants"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-maroon px-7 py-3 text-sm font-black text-white shadow-soft transition hover:bg-gold hover:text-maroon focus:outline-none focus:ring-4 focus:ring-gold/50"
              >
                Browse kiosks
              </Link>
              <a
                href="#nearby-kiosks"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 bg-white/10 px-7 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-maroon focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                See kiosks
              </a>
            </div>
          </div>

          <form
            action="/restaurants"
            className="w-full rounded-lg border border-white/25 bg-cream/95 p-4 shadow-2xl backdrop-blur"
          >
            <label htmlFor="campus-search" className="text-sm font-black uppercase text-maroon">
              Find food now
            </label>
            <div className="mt-3 flex min-h-12 overflow-hidden rounded-md border border-maroon/20 bg-white">
              <input
                id="campus-search"
                name="q"
                type="search"
                placeholder="Search kiosks, meals, drinks"
                className="min-w-0 flex-1 px-4 text-base outline-none placeholder:text-ink/45"
              />
              <button
                type="submit"
                className="min-w-24 bg-maroon px-5 text-sm font-black text-white transition hover:bg-gold hover:text-maroon focus:outline-none focus:ring-4 focus:ring-gold/40"
              >
                Search
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {["3 kiosks", "Pickup only", "Available now"].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-maroon/10 bg-white px-2 py-2 text-xs font-bold uppercase text-maroon"
                >
                  {item}
                </span>
              ))}
            </div>
          </form>
        </div>
      </section>

      <section id="home-features" className="border-y border-maroon/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {homeFeatures.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-maroon/10 bg-paper p-5">
              <h2 className="font-display text-3xl leading-none text-maroon">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/72">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="nearby-kiosks" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-gold-dark">Nearby kiosks</p>
            <h2 className="font-display mt-1 text-5xl leading-none text-maroon">
              Order from campus vendors
            </h2>
          </div>
          <div
            className="grid min-h-12 grid-cols-2 rounded-md border border-maroon/15 bg-white p-1"
            aria-label="Kiosk navigation"
          >
            <Link href="/restaurants" className="rounded bg-maroon px-5 py-2 text-sm font-black text-white">
              List
            </Link>
            <a href="#map-preview" className="rounded px-5 py-2 text-sm font-black text-maroon transition hover:bg-cream">
              Map
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {restaurants.map((restaurant, index) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="group overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-gold/40"
            >
              <div className="relative h-48 overflow-hidden">
                <FoodImage
                  src={restaurant.image}
                  fallbackSrc={restaurant.fallbackImage}
                  alt={restaurant.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-md px-3 py-1 text-xs font-black uppercase text-white ${kioskAccents[index] ?? "bg-maroon"}`}
                >
                  {restaurant.status ?? "Open now"}
                </span>
                <span className="absolute bottom-3 right-3 rounded-md bg-white px-3 py-1 text-xs font-black uppercase text-maroon shadow">
                  {restaurant.wait_time ?? "15-20 min"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase text-gold-dark">
                  {restaurant.category}
                </p>
                <h3 className="font-display mt-1 text-3xl leading-none text-maroon">
                  {restaurant.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-ink/65">{restaurant.location}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/70">
                  {restaurant.description}
                </p>
                <p className="mt-3 text-sm font-black text-forest">
                  {restaurant.availability ?? "Available today"}
                </p>
                <span className="mt-5 inline-flex min-h-11 items-center rounded-md border border-maroon/30 px-4 text-sm font-black text-maroon transition group-hover:bg-maroon group-hover:text-white">
                  View menu
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-forest px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-display text-2xl text-gold">Popular orders today</p>
            <h2 className="font-display mt-1 text-5xl leading-none">Budget-friendly campus food</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/78">
              Each menu item shows its current status, price, and kiosk before students commit
              to cart or checkout.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredItems.slice(0, 6).map((item, index) => (
              <Link
                key={item.id}
                href={`/restaurants/${item.restaurantId}`}
                className="rounded-lg border border-white/12 bg-white p-4 text-ink shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-gold/40"
              >
                <div className="flex items-start gap-4">
                  <FoodImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3 border-b border-maroon/10 pb-2">
                      <h3 className="text-lg font-black leading-tight text-maroon">
                        {item.name}
                      </h3>
                      <p className="text-base font-black text-maroon">{formatPeso(item.price)}</p>
                    </div>
                    <p className="mt-2 text-xs font-black uppercase text-gold-dark">
                      {item.restaurantName}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-maroon/10 px-2 py-1 text-xs font-bold text-maroon">
                        {index % 2 === 0 ? "Popular pick" : "Quick order"}
                      </span>
                      <span className="rounded-md bg-forest/10 px-2 py-1 text-xs font-bold text-forest">
                        {item.availability ?? "Available now"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="font-display text-2xl text-gold-dark">Quick reorder</p>
          <h2 className="font-display mt-1 text-5xl leading-none text-maroon">
            Repeat your campus routine
          </h2>
          <div className="mt-8 grid gap-4">
            {quickReorders.map((order) => (
              <Link
                key={order.id}
                href={order.href}
                className="rounded-lg border border-maroon/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-gold/40"
              >
                <p className="text-lg font-black text-maroon">{order.name}</p>
                <p className="mt-2 text-sm leading-6 text-ink/68">{order.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div id="map-preview" className="rounded-lg border border-maroon/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-gold-dark">Map preview</p>
              <h3 className="font-display text-4xl leading-none text-maroon">Available nearby</h3>
            </div>
            <img
              src="/images/iskorder-pin-logo-clean.png"
              alt=""
              aria-hidden="true"
              className="h-16 w-16 rounded-md object-contain"
            />
          </div>
          <div className="relative mt-6 h-80 overflow-hidden rounded-lg bg-map p-4">
            {[
              ["ECON LOUNGE", "left-[16%] top-[30%]"],
              ["Chicken City", "left-[54%] top-[24%]"],
              ["Tess' Store", "left-[34%] top-[62%]"],
            ].map(([label, position]) => (
              <div
                key={label}
                className={`absolute ${position} rounded-md bg-white px-3 py-2 text-xs font-black uppercase text-maroon shadow`}
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-forest" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
