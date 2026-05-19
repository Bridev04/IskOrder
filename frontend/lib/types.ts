export type ServiceType = "pickup" | "delivery";
export type PaymentMethod = "GCash" | "InstaPay";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  fallbackImage?: string;
  availability?: string;
};

export type RecommendedOrder = {
  id: string;
  name: string;
  description: string;
  items: {
    menu_item_id: string;
    quantity: number;
  }[];
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  headerImage?: string;
  fallbackImage?: string;
  location: string;
  service_types: ServiceType[];
  status?: string;
  availability?: string;
  wait_time?: string;
  menu: MenuItem[];
  recommended_orders: RecommendedOrder[];
};

export type CartItem = {
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
  quantity: number;
};

export type OrderPayload = {
  customer_name: string;
  restaurant_id: string;
  service_type: ServiceType;
  contact_number: string;
  pickup_time: string;
  payment_method: PaymentMethod;
  items: {
    menu_item_id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total_price: number;
  notes: string;
};

export type OrderResponse = {
  order_id: string;
  status: string;
  estimated_time: string;
  order: OrderPayload;
  restaurant: {
    id: string;
    name: string;
    location: string;
  };
};
