# Inventory Management App

A simple full-stack web application to manage inventory. Users can add, view, and delete products.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)

## Project Structure

```
Inventory App/
├── backend/
│   ├── controllers/      # Route logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── server.js         # Entry point and config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally

## Installation

1.  **Clone or Download** this repository.

2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    ```

3.  **Setup Frontend**:
    ```bash
    cd frontend
    npm install
    ```

## Running the Application

1.  **Start MongoDB** (if not already running):
    - Windows: open `services.msc` and start `MongoDB Server` or run `mongod` in a terminal.

2.  **Start Backend**:
    - Open a terminal in the `backend` folder.
    - Run: `npm start`
    - Server runs at: `http://localhost:5000`

3.  **Start Frontend**:
    - Open a new terminal in the `frontend` folder.
    - Run: `npm run dev`
    - App runs at: `http://localhost:5173` (or similar)

## API Endpoints

- `GET /products` - Fetch all products
- `POST /products` - Add a new product
- `DELETE /products/:id` - Delete a product
