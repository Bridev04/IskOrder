import { RestaurantCard } from "@/components/RestaurantCard";
import { getRestaurants } from "@/lib/api";

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase text-gold-dark">Browse</p>
        <h1 className="font-display mt-2 text-5xl leading-none text-maroon sm:text-6xl">
          Kiosks near UP Diliman
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink/70">
          View menus from ECON LOUNGE, Area 2 Chicken City, and Tess' Store.
          Log in as a student or teacher when you are ready to order.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
