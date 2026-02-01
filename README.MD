# 🛒 Store Inventory Manager

**React + Node.js + MongoDB**

---

## 📌 Overview

This project is a store inventory management system built as part of a development exercise.

**It includes:**
- A React Single Page Application (SPA)
- A Node.js + Express backend
- MongoDB persistence
- Unit tests (Jest + Supertest)
- Dockerized backend for easy setup

**The system allows managing:**
- A list of products
- A list of inventory items (product + quantity)

**The UI follows the provided mock templates and maintains a clear separation between:**
- UI layer
- Business logic
- API/data access layer

---

## 🎯 Functional Requirements

### 🧾 Products
- Add a product (name only)
- Rename an existing product
- Delete a product
- Fetch all products

### 📦 Inventory
- Fetch inventory list
- Set inventory list (validated against products list)
- Reset inventory

---

## 🔧 API Design Notes

During development, the following improvements were applied:

**Product creation endpoint was changed from:**
- PUT → POST

...to better follow REST conventions.

**Additional product endpoints were added:**
- ✏️ Rename product
- 🗑️ Delete product

---

## 🗂️ Project Structure

```
root/
  backend/
    src/
      routes/
      controllers/
      services/
      models/
      config/
    tests/
    Dockerfile
    .env.example

  frontend/
    src/
      components/
      hooks/
      pages/
      services/
      utils/
```

---

## ▶️ Running the Project (Without Docker)

### 🔹 Backend
```
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:
```
http://localhost:3000
```

Run tests:
```
npm run test
```

### 🔹 Frontend
```
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🐳 Running Backend with Docker

**Build image**
```
docker build -t zemingo-backend .
```

**Run container**
```
docker run -p 3000:3000 --env-file .env zemingo-backend
```

---

## 🌐 API Endpoints

### Product API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/product/all | Get all products |
| POST | /api/product | Create product |
| PUT | /api/product/:oldName | Rename product |
| DELETE | /api/product/:name | Delete product |

### Inventory API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/inventory | Get inventory |
| POST | /api/inventory | Set inventory |
| POST | /api/inventory/reset | Reset inventory |

---

## 🧠 Architecture & Design

### Frontend

The frontend follows a layered design:
- Pages → layout & composition
- Components → UI only
- Hooks → business logic
- Services → API communication

This ensures:
- Reusability
- Testability
- Clean separation of concerns

Routing is handled using React Router.

### Backend

Layered structure:
- Routes → HTTP mapping
- Controllers → request/response handling
- Services → business logic & validation
- Models → database schemas (Mongoose)

This improves:
- Maintainability
- Test coverage
- Scalability

---

## ✅ Validation Rules

- Product name must be unique and not empty
- Inventory list:
  - must be an array
  - each item must include name and quantity
  - all items must exist in products list
- Deleting a product removes it from inventory automatically.

---

## 🧪 Testing

Tests implemented using:
- Jest
- Supertest
- Separate MongoDB test database

Covered cases:
- Product creation / update / deletion
- Duplicate product handling
- Inventory validation
- Inventory reset

---

## 🤖 AI Tools Used

AI assistance was used during development.

**Tool:** ChatGPT

**Example prompts:**
- "Generate Jest + Supertest tests for an Express Product API."
- "Explain how to dockerize a Node.js backend."

**Tool:** Cursor

**Example prompts:**
- "You are a Senior Frontend Developer. Help me to style the react app using tailwind css library."