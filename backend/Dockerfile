# backend/Dockerfile

# or python:3.11
FROM python:3.10-slim 

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# CMD for development
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# CMD for production
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] # production



