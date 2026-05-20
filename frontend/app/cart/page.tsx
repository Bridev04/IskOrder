"use client";

import Link from "next/link";
import { FoodImage } from "@/components/FoodImage";
import { useCart } from "@/components/CartProvider";
import { formatPeso } from "@/lib/format";

export default function CartPage() {
  const { items, loaded, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const restaurantName = items[0]?.restaurantName;

  if (!loaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Cart</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">Loading cart</h1>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Cart</p>
        <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-ink/65">Pick a campus favorite and add a meal to start.</p>
        <Link
          href="/restaurants"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white sm:w-auto"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Cart</p>
          <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-5xl">{restaurantName}</h1>
        </div>
        <button onClick={clearCart} className="font-bold text-maroon hover:text-ink">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((cartItem) => (
            <article
              key={cartItem.item.id}
              className="grid gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-maroon/10 sm:grid-cols-[96px_1fr_auto]"
            >
              <FoodImage
                src={cartItem.item.image}
                fallbackSrc={cartItem.item.fallbackImage}
                alt={cartItem.item.name}
                className="h-40 w-full rounded-md object-cover sm:h-24 sm:w-24"
              />
              <div>
                <h2 className="text-lg font-black text-ink">{cartItem.item.name}</h2>
                <p className="mt-1 text-sm text-ink/65">{cartItem.item.description}</p>
                <p className="mt-2 font-black text-maroon">{formatPeso(cartItem.item.price)}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-between">
                <div className="flex items-center rounded-full border border-maroon/15 bg-cream">
                  <button
                    onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                    className="px-3 py-2 font-black text-maroon"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center font-black">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                    className="px-3 py-2 font-black text-maroon"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(cartItem.item.id)}
                  className="text-sm font-bold text-ink/55 hover:text-maroon"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm ring-1 ring-maroon/10">
          <h2 className="font-display text-4xl leading-none text-maroon">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-black">{formatPeso(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-ink/60">
              <span>Demo service fee</span>
              <span>Free</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between border-t border-maroon/10 pt-5 text-xl font-black">
            <span>Total</span>
            <span className="text-maroon">{formatPeso(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full justify-center rounded-full bg-maroon px-6 py-3 font-black text-white hover:bg-maroon/90"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
