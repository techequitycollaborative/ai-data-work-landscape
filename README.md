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
git clone https://github.com/dsherbini/data-work-landscape.git
cd data-work-landscape
```
#### 3. Launch the App

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

### 4. Accessing the App

The application will be available at:

- Frontend: http://localhost:5173
- Backend (FastAPI): http://localhost:8000
- PostgreSQL: localhost:5432

Update compose.yaml to change port numbers.

## License
This project is licensed under the MIT License.
