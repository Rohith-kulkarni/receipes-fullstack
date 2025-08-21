# 🍳 Recipes API (Backend)

This is the backend service for the **Recipes Svc**, built with Express, and PostgreSQL.  
The API provides endpoints to manage and fetch recipes, with Swagger documentation included.

---

## Prerequisites

Before running this project, ensure you have installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js (>=14.x)](https://nodejs.org/)

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
POSTGRES_USER=recipe_user
POSTGRES_PASSWORD=recipe_pass
POSTGRES_DB=recipes_db
DB_HOST=db
DB_PORT=5432

PORT=8000
