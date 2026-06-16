from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Cocos Beach Resort API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database Models
class Booking(BaseModel):
    id: Optional[str] = None
    guest_name: str
    contact: str
    guests: int
    room: str
    check_in: str
    check_out: str
    room_rate: float
    status: str = "Upcoming"

bookings_db = []

@app.get("/")
def read_root():
    return {"message": "Cocos Beach Resort API is running"}

@app.get("/api/bookings", response_model=List[Booking])
def get_bookings():
    return bookings_db

@app.post("/api/bookings", response_model=Booking)
def create_booking(booking: Booking):
    booking.id = f"BK-2026-{100 + len(bookings_db)}"
    bookings_db.append(booking)
    return booking

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)