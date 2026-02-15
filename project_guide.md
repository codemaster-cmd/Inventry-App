# Project Architecture Guide (MERN Stack)

Welcome to your Inventory App! As a new MERN developer, here is a breakdown of how your application works.

## 1. The Big Picture (MERN)
Your app consists of three main parts working together:
*   **M**ongoDB: The **Database** (Stores your data).
*   **E**xpress & **N**ode.js: The **Backend** (The API that talks to the database).
*   **R**eact: The **Frontend** (The UI that the user interacts with).

```mermaid
graph LR
    User[User (Browser)] <-->|Clicks & Views| React[React Frontend (Port 5173)]
    React <-->|Fetch API Requests| Express[Express Backend (Port 5000)]
    Express <-->|Mongoose Queries| MongoDB[(MongoDB Database)]
```

## 2. Frontend (The User Interface)
*   **Location**: `frontend/` folder.
*   **Tech**: React (built with Vite).
*   **Key Files**:
    *   `src/App.jsx`: The main container. It holds the "sate" (list of products).
    *   `src/components/ProductList.jsx`: Displays the list. It takes data via `props`.
    *   `src/components/AddProduct.jsx`: A form to add items. It calls `fetch()` to send data to the backend.
*   **How to Run**:
    *   Command: `npm run dev` (Vite uses this instead of `npm start`).
    *   Runs on: `http://localhost:5173`.

## 3. Backend (The Logic)
*   **Location**: `backend/` folder.
*   **Tech**: Node.js & Express.
*   **Key Files**:
    *   `server.js`: The entry point. It starts the server and connects to the database.
    *   `models/Product.js`: Defines the **Schema** (structure) of your data (name, price, etc.).
    *   `routes/productRoutes.js`: Defines URLs like `/products` (GET) or `/products/:id` (DELETE).
    *   `controllers/productController.js`: The actual logic. It says "When someone goes to this URL, find data in the DB and send it back."
*   **How to Run**:
    *   Command: `npm start`.
    *   Runs on: `http://localhost:5000`.

## 4. The Flow of Data
Here is what happens when a user adds a product:
1.  **Frontend**: User fills the form and clicks "Add".
2.  **Frontend**: `fetch('http://localhost:5000/products', method: 'POST')` sends the data.
3.  **Backend**: `server.js` receives it -> sends to `productRoutes` -> sends to `productController`.
4.  **Database**: The Controller saves the `new Product()` to MongoDB.
5.  **Response**: MongoDB says "Success", Backend tells Frontend "Created 201".
6.  **Update**: Frontend sees the success and refreshes the list.
