from sqlalchemy import Column, Integer, String, Text
from db import Base

class DataItem(Base):
    __tablename__ = "data_for_microsite"
    __table_args__ = {"schema": "data_work"}

    company_name = Column(String, primary_key=True, index=True)
    alternate_company_name = Column(String, nullable=True)
    company_website = Column(String, nullable=True)
    company_headquarters = Column(String, nullable=True)
    company_type = Column(String, nullable=True)
    workforce_model = Column(String, nullable=True)
    has_in_house_marketplace = Column(String, nullable=True)
    in_house_marketplace_name = Column(String, nullable=True)
    in_house_marketplace_website = Column(String, nullable=True)
    product_project_assisted_by_data_workers = Column(Text, nullable=True)
    known_worker_locations = Column(String, nullable=True)
    article_1_title = Column(String, nullable=True)
    article_1_link = Column(String, nullable=True)
    article_2_title = Column(String, nullable=True)
    article_2_link = Column(String, nullable=True)
    article_3_title = Column(String, nullable=True)
    article_3_link = Column(String, nullable=True)
    article_4_title = Column(String, nullable=True)
    article_4_link = Column(String, nullable=True)
    article_5_title = Column(String, nullable=True)
    article_5_link = Column(String, nullable=True)

