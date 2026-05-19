import os
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .data import get_restaurant, restaurants
from .schemas import OrderCreate

app = FastAPI(
    title="IskOrder API",
    description="FastAPI backend for a UP Diliman food ordering app.",
    version="0.1.0",
)

default_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
] or default_origins
allowed_origin_regex = os.getenv(
    "CORS_ALLOW_ORIGIN_REGEX",
    r"https://.*\.vercel\.app|http://(localhost|127\.0\.0\.1):[0-9]+",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "IskOrder API is running"}


@app.get("/restaurants")
def list_restaurants():
    return restaurants


@app.get("/restaurants/{restaurant_id}")
def restaurant_detail(restaurant_id: str):
    restaurant = get_restaurant(restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant


@app.post("/orders")
def create_order(order: OrderCreate):
    restaurant = get_restaurant(order.restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    if order.service_type not in restaurant["service_types"]:
        raise HTTPException(
            status_code=400,
            detail=f"{restaurant['name']} does not support {order.service_type}.",
        )

    estimated_time = "15-20 minutes" if order.service_type == "pickup" else "30-45 minutes"

    return {
        "order_id": f"ISK-{uuid4().hex[:8].upper()}",
        "status": "Order received",
        "estimated_time": estimated_time,
        "order": order.model_dump(),
        "restaurant": {
            "id": restaurant["id"],
            "name": restaurant["name"],
            "location": restaurant["location"],
        },
    }
