<img src="frontend/public/logo.png" alt="TechEquity Logo" width="10%"/>

# Data Work Landscape

The Data Work Landscape is a project that aims to shine a light on the industry of AI data work. This site features our research into the main companies in this industry. To view the site, go to https://dataworklandscape.org.

## For Developers

This project includes a **React frontend**, **FastAPI backend**, and **PostgreSQL database**, all wired together using Docker Compose. Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/) (for cloning the repository)

### Getting Started

#### 1. Environmental Variables

Make sure the backend has a `.env` file in the `./backend` folder with your database credentials:

```
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
POSTGRES_HOST=your_host
POSTGRES_PORT=yourport
sslmode = require (optional)
```

#### 2. Clone the Repository

```bash
git clone https://github.com/techequitycollaborative/ai-data-work-landscape.git
cd ai-data-work-landscape
```

#### 3. Adjust CORS for development
Add your localhost url path to the CORS configuration in backend/main.py:

```python
# backend/main.py
# CORS so React can access site -- for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 4. Update localhost API call

```jsx

// frontend/Landscape.jsx
    fetch('http://localhost:8000/data') // for development
```

#### 5.Adjust frontend Dockerfile
Ensure frontend/Dockerfile is configured for the development environment.


#### 6. Launch the App

Initial launch:
```bash
docker-compose build --no-cache
docker-compose up
```

To relaunch after making changes:
```bash
docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up
```

The app code is mounted into the containers for live reload during development.
Node modules in the frontend are preserved with ```/app/node_modules``` in compose.yaml.

### Accessing the App

The application will be available at:

- Frontend: http://localhost:5173
- Backend (FastAPI): http://localhost:8000
- PostgreSQL: localhost:5432

Update compose.yaml to change port numbers.
