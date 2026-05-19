from typing import Literal

from pydantic import BaseModel, Field


class OrderItem(BaseModel):
    menu_item_id: str = Field(..., examples=["tess-combo-1"])
    name: str = Field(..., examples=["Combo 1"])
    quantity: int = Field(..., ge=1, examples=[2])
    price: float = Field(..., ge=0, examples=[135])


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=1, examples=["Juan dela Cruz"])
    restaurant_id: str = Field(..., examples=["tess-store"])
    service_type: Literal["pickup", "delivery"]
    contact_number: str = Field(..., min_length=1, examples=["09171234567"])
    pickup_time: str = Field(..., min_length=1, examples=["12:45 PM"])
    payment_method: Literal["GCash", "InstaPay"]
    items: list[OrderItem] = Field(..., min_length=1)
    total_price: float = Field(..., ge=0, examples=[270])
    notes: str | None = Field(default="", examples=["No onions, please."])
