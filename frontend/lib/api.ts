import type { OrderPayload, OrderResponse, Restaurant } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export function getRestaurants() {
  return request<Restaurant[]>("/restaurants");
}

export function getRestaurant(id: string) {
  return request<Restaurant>(`/restaurants/${id}`);
}

export function createOrder(order: OrderPayload) {
  return request<OrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}
