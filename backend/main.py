from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, engine
from models import DataItem

app = FastAPI()

# CORS so React can access site -- for production
#origins = [
#    "https://dataworklandscape.org",
#    "https://www.dataworklandscape.org",
#    "https://data-work-landscape-lymyf.ondigitalocean.app"
#]

#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=origins, # only allow custom frontend, not all sites
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#)

# CORS so React can access site -- for development
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
            "company_type": item.company_type,    
            "workforce_model": item.workforce_model,
            "has_in_house_marketplace": item.has_in_house_marketplace,
            "in_house_marketplace_name": item.in_house_marketplace_name,
            "in_house_marketplace_website": item.in_house_marketplace_website,
            "product_project_assisted_by_data_workers": item.product_project_assisted_by_data_workers,
            "known_worker_locations": item.known_worker_locations,
            "article_1_title": item.article_1_title,
            "article_1_link": item.article_1_link,
            "article_2_title": item.article_2_title,
            "article_2_link": item.article_2_link,
            "article_3_title": item.article_3_title,
            "article_3_link": item.article_3_link,
            "article_4_title": item.article_4_title,
            "article_4_link": item.article_4_link,
            "article_5_title": item.article_5_title,
            "article_5_link": item.article_5_link,
        }
        for item in items
    ]

