import Link from "next/link";
import { FoodImage } from "./FoodImage";
import type { Restaurant } from "@/lib/types";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="group overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative h-48 overflow-hidden">
        <FoodImage
          src={restaurant.image}
          fallbackSrc={restaurant.fallbackImage}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-maroon">
          {restaurant.category}
        </div>
        <div className="absolute bottom-3 left-3 rounded-md bg-forest px-3 py-1 text-xs font-black uppercase text-white shadow">
          {restaurant.status ?? "Open now"}
        </div>
        <div className="absolute bottom-3 right-3 rounded-md bg-white px-3 py-1 text-xs font-black uppercase text-maroon shadow">
          {restaurant.wait_time ?? "15-20 min"}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-display text-3xl leading-none text-maroon">{restaurant.name}</h3>
          <p className="mt-1 text-sm font-semibold text-ink/60">{restaurant.location}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-ink/70">{restaurant.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
            {restaurant.availability ?? "Available today"}
          </span>
          {restaurant.service_types.map((serviceType) => (
            <span
              key={serviceType}
              className="rounded-full bg-maroon/5 px-3 py-1 text-xs font-bold capitalize text-maroon"
            >
              {serviceType}
            </span>
          ))}
        </div>
        <span className="inline-flex w-full justify-center rounded-full bg-maroon px-4 py-2 text-sm font-black text-white transition group-hover:bg-gold group-hover:text-maroon sm:w-auto">
          View menu
        </span>
      </div>
    </Link>
  );
}
