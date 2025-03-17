Rainbow Company - Monorepo
This project is a monorepo that contains two main modules: app-ui (frontend) and app-api (backend),
as well as a PostgreSQL database. The application uses Docker
to orchestrate the containers, and the essential technologies are Java, React, TypeScript, and PostgreSQL.


Project Structure
The structure of the repository is as follows:
rainbow-company/
│
├── app-ui/                # Frontend (React + TypeScript)
│   ├── Dockerfile         # Dockerfile for the frontend application
│   ├── package.json       # Frontend dependencies (Node)
│   ├── yarn.lock          # Lock file for frontend dependencies
│   └── src/               # Frontend source code
│
├── app-api/               # Backend (Java + Spring Boot)
│   ├── Dockerfile         # Dockerfile for the backend application
│   ├── pom.xml            # Backend dependencies (Maven)
│   └── src/               # Backend source code
│
└── docker-compose.yml     # Docker Compose orchestration file


Technologies
Frontend: React, TypeScript
Backend: Java, Spring Boot
Database: PostgreSQL
Orchestration: Docker, Docker Compose


Execution Instructions
1. Environment Setup
.env file in app-ui (Frontend)
In the app-ui directory, create a .env file with the following content:
# app-ui/.env
VITE_API_URL=http://backend:8080


.env file in app-api (Backend)
In the app-api directory, create a .env file with the following content:
# app-api/.env
POSTGRES_PASSWORD= 
This variable POSTGRES_PASSWORD is used to configure the PostgreSQL database password in
the backend, ensuring that the application can connect to the database.


2. Running the Application
To run the application using Docker Compose, follow these steps:

Step 1: Install Dependencies
Frontend (React + TypeScript)
Go to the app-ui directory and run the following command to install the dependencies:
cd app-ui
yarn install

Backend (Java + Spring Boot)
Go to the app-api directory and run the Maven command to download the dependencies:
cd app-api


Step 2: Start the Containers
In the root of the project, run the following command to start the Docker containers:
docker-compose up --build


his command will:

Build Docker images for the app-ui (frontend), app-api (backend), and PostgreSQL database.
Create and start the containers.
Expose the ports:
Frontend: http://localhost:5173
Backend (API): http://localhost:8080
Database: 5432 (connected via Docker to the app-api)
Step 3: Access the Application
Once the containers are running, the application will be available at the following addresses:

Frontend: Access the frontend at http://localhost:5173.
API (Backend): The API will be available at http://localhost:8080.
3. Container Structure
The docker-compose.yml file configures the following services:

PostgreSQL: A container running the PostgreSQL database.
App API (Backend): A container running the Spring Boot (Java) application that connects to the database.
App UI (Frontend): A container running the React application, which communicates with the backend.
4. How the Dockerfiles Work
Frontend (React + TypeScript)
The Dockerfile for the frontend uses the node:20 image to build the React application and then uses the nginx:alpine image to serve the static files.

Backend (Java + Spring Boot)
The Dockerfile for the backend uses the eclipse-temurin:21-jdk image to compile and run the Spring Boot application.



