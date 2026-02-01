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

## 🔧 API Design Notes (Simple Version)

Some adjustments were made to the API in order to match the functional requirements more accurately:

- Since the requirements specify that products can be deleted, a dedicated DELETE endpoint was added for product removal.
- The same endpoint is used for both creating and updating products:
  - Create product → PUT `/product` with `{ name }`
  - Update product → PUT `/product` with `{ _id, name }`
- The backend decides whether to create or update based on the presence of the `_id` field.
- Deleting a product also removes it from the inventory automatically to keep the system consistent.

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
| GET | /product/all | Get all products |
| PUT | /product | Create or update product |
| DELETE | /product/:name | Delete product |

**Create product example:**
```
{ "name": "milk" }
```

**Update product example:**
```
{ "_id": "64f123abc123", "name": "chocolate" }
```

### Inventory API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /inventory | Get inventory |
| POST | /inventory | Set inventory |
| POST | /inventory/reset | Reset inventory |

**Inventory item format:**
```
{ "name": "milk", "quantity": 3 }
```

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
- Product creation, update and deletion
- Duplicate product handling
- Inventory validation
- Inventory reset

---

## 🤖 AI Tools Used

AI assistance was used during development.

**Tool: ChatGPT**  
**Example prompts:**
- "Generate Jest + Supertest tests for an Express Product API."
- "Help me refactor my backend to a layered architecture."

**Tool: Cursor**  
**Example prompts:**
- "You are a Senior Frontend Developer. Help me style the React app using Tailwind CSS."