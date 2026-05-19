"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (restaurantId: string, restaurantName: string, item: MenuItem) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  removeItem: (menuItemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "iskorder-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(storageKey);
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, loaded]);

  function addItem(restaurantId: string, restaurantName: string, item: MenuItem) {
    setItems((currentItems) => {
      const isDifferentRestaurant =
        currentItems.length > 0 && currentItems[0].restaurantId !== restaurantId;
      const baseCart = isDifferentRestaurant ? [] : currentItems;
      const existingItem = baseCart.find((cartItem) => cartItem.item.id === item.id);

      if (existingItem) {
        return baseCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...baseCart, { restaurantId, restaurantName, item, quantity: 1 }];
    });
  }

  function updateQuantity(menuItemId: string, quantity: number) {
    if (quantity < 1) {
      removeItem(menuItemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.item.id === menuItemId ? { ...cartItem, quantity } : cartItem,
      ),
    );
  }

  function removeItem(menuItemId: string) {
    setItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.item.id !== menuItemId),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, cartItem) => sum + cartItem.quantity, 0),
      totalPrice: items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0,
      ),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
