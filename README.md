# Notak - Node.js + TypeScript + Drizzle Backend
Little app that helps learning polish creating exercises with the introduced words in your database. 

## 📝 Overview
This project is a learning-oriented backend built with **Node.js**, **TypeScript**, and **Drizzle ORM**.  
It connects to a **PostgreSQL** database running in **Localhost** (**Docker** in the near future), and handles authentication and protected routes using **JWT** and secure password hashing with **bcrypt**.
<!--
The main goal is to understand the complete backend development flow — from database schema definition to API responses — as part of a full-stack learning process.
-->
---

## 🧠 Tech Stack
- **Node.js** — runtime environment  
- **Express.js** — web framework for handling routes and requests  
- **TypeScript** — static typing for safer and more maintainable code  
- **Drizzle ORM** — type-safe SQL ORM for database access  
- **PostgreSQL** — relational database  
- **Docker** — containerized database environment  
- **Zod + Drizzle-Zod** — input validation and schema synchronization  
- **UUID** — for unique user and entity identifiers  

---

## ⚙️ Installation

### Clone the repository
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### Install dependencies
```
npm install
```
### Set up environment variables
Create a .env file in the project root and include:
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
PORT=XXXX
NODE_ENV="development"

JWT_SECRET=your-secret
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN="30"
```
### Start PostgreSQL (if using Docker)
```
docker start postgres
```
### Run the development server
```
npm run dev
```
---

## 🧪 Next steps
- Add integration tests for API endpoints using Jest.
Focus on testing authentication routes and CRUD operations.

- Creation of a frontend in React to show the suggested flow of the app.

## 💻 Author
Developed by [alopezoy](https://github.com/aloyarzabal)
Built as part of a personal learning project to strengthen backend development skills and understand the full API lifecycle.
