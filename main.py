
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="SaaS Ordering System API")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class ThemeConfig(BaseModel):
    primary: str  # Fixed: Use 'str' instead of 'string'
    secondary: str
    borderRadius: str

class Features(BaseModel):
    dineIn: bool
    pickup: bool
    delivery: bool
    express: bool
    topup: bool
    coupons: bool

class Merchant(BaseModel):
    id: str
    name: str
    slogan: str
    logo: str
    mascot: str
    theme: ThemeConfig
    features: Features

class Product(BaseModel):
    id: str
    name: str
    price: float
    vipPrice: Optional[float] = None
    image: str
    category: str
    description: str
    specs: Optional[List[str]] = None

class OrderItem(BaseModel):
    productId: str
    quantity: int
    spec: Optional[str] = None

class OrderCreate(BaseModel):
    merchantId: str
    items: List[OrderItem]
    totalPrice: float
    orderType: str

# --- Mock Database ---

MERCHANTS = [
    {
        "id": "TX1",
        "name": "棠小一烘焙",
        "slogan": "TANG XIAO YI",
        "logo": "棠",
        "mascot": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
        "theme": {"primary": "#f7e28b", "secondary": "#d4b945", "borderRadius": "40px"},
        "features": {"dineIn": True, "pickup": True, "delivery": True, "express": True, "topup": True, "coupons": True}
    },
    {
        "id": "MIO",
        "name": "Mio Coffee",
        "slogan": "MIO BREW",
        "logo": "M",
        "mascot": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
        "theme": {"primary": "#2D5A27", "secondary": "#1A3317", "borderRadius": "12px"},
        "features": {"dineIn": True, "pickup": True, "delivery": False, "express": False, "topup": True, "coupons": True}
    }
]

PRODUCTS = {
    "TX1": [
        {"id": "1", "name": "半条梦龙425g超大块", "price": 38.9, "vipPrice": 29.34, "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", "category": "店铺线下活动", "description": "浓郁巧克力与松软蛋糕的完美结合。", "specs": ["标准份", "加大份"]},
        {"id": "3", "name": "红丝绒芒果慕斯蛋糕", "price": 19.9, "vipPrice": 11.94, "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop", "category": "「😋」进店福利", "description": "口感轻盈细腻。", "specs": ["3寸", "6寸"]}
    ],
    "MIO": [
        {"id": "m1", "name": "经典拿铁", "price": 28.0, "vipPrice": 18.0, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop", "category": "精品咖啡", "description": "精选意式拼配，醇厚回甘。", "specs": ["热", "冰"]}
    ]
}

ORDERS = []

# --- API Endpoints ---

@app.get("/api/merchants", response_model=List[Merchant])
async def get_merchants():
    return MERCHANTS

@app.get("/api/merchants/{merchant_id}/menu", response_model=List[Product])
async def get_menu(merchant_id: str):
    if merchant_id not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Merchant not found")
    return PRODUCTS[merchant_id]

@app.post("/api/orders")
async def create_order(order: OrderCreate):
    new_order = order.model_dump() if hasattr(order, 'model_dump') else order.dict()
    new_order["id"] = str(len(ORDERS) + 1000)
    new_order["status"] = "已支付"
    ORDERS.append(new_order)
    return {"success": True, "orderId": new_order["id"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
