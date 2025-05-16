from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data
DATA = [
    {"id": 1, "name": "Alice", "value": 42},
    {"id": 2, "name": "Bob", "value": 77},
]

@app.get("/data")
def get_data():
    return DATA

@app.post("/submit")
def submit_form(name: str = Form(...), value: str = Form(...)):
    DATA.append({"id": len(DATA)+1, "name": name, "value": value})
    return {"status": "success", "message": "Data added"}
