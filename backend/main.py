from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, engine
from models import DataItem

app = FastAPI()

# CORS so React can access it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/data")
def get_data(db: Session = Depends(get_db)):
    items = db.query(DataItem).all()
    return [
        {
            "company_name": item.company_name,
            "company_website": item.company_website,
            "company_headquarters": item.company_headquarters,
            "workforce_model": item.workforce_model,
            "pay_rate": item.pay_rate,
            "known_worker_locations": item.known_worker_locations,
        }
        for item in items
    ]

