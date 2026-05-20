import { KioskBrowser } from "@/components/KioskBrowser";
import { getRestaurants } from "@/lib/api";

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase text-gold-dark">Browse</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-6xl">
          Kiosks near UP Diliman
        </h1>
        <p className="mt-4 text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
          View menus from Econ Lounge, Area 2 Chicken City, and Tess' Store.
          Log in as a student or teacher when you are ready to order.
        </p>
      </div>

      <KioskBrowser restaurants={restaurants} />
    </div>
  );
}
