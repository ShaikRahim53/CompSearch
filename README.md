# 🏢 CompSearch

CompSearch is a **full-stack company search and discovery web app** built with **React.js**, **Node.js**, **Express**, and **MongoDB**.  
It allows users to explore, filter, and sort companies based on various parameters such as industry, location, and more.

---

## 🚀 Live Demo

🌐 **Frontend:** [https://compsearch.onrender.com](https://compsearch.onrender.com)  
🧠 **Backend API:** [https://compsearch-1.onrender.com](https://compsearch-1.onrender.com)

---

## 📸 Screenshots

> _(Add your screenshots here once ready — for example, home page, company cards, filters, etc.)_

![Home Page](./screenshots/homepage.png)
![Company List](./screenshots/company-list.png)

---

## 🧩 Features

✅ Browse a list of companies with detailed info  
✅ Filter by **location** and **industry**  
✅ Search companies by name or keyword  
✅ Sort results by name, location, or creation date  
✅ Switch between **Table View** and **Card View**  
✅ Pagination support for large datasets  
✅ Responsive UI using **TailwindCSS**  
✅ Fully deployed on **Render**

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ React.js (Vite)
- 🎨 TailwindCSS
- 🌍 Deployed on [Render](https://render.com)

### **Backend**
- 🧠 Node.js + Express.js
- 🍃 MongoDB (via Mongoose)
- 🐙 Deployed on Render as a Web Service

---

## 📂 Project Structure

CompSearch/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/ # Node + Express backend
│ ├── models/
│ ├── routes/
│ ├── db.js
│ ├── seed.js
│ ├── index.js
│ └── package.json
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside your `server/` folder:

PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/companies_db

---

## 🧑‍💻 Local Development Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/CompSearch.git
cd CompSearch

2️⃣ Backend setup
cd server
npm install


Run MongoDB locally or use MongoDB Atlas, then create .env file as above.

To seed sample data:

node seed.js


Start backend:

node index.js


Backend runs at:
👉 http://localhost:5000
 (or whatever port you configured)

3️⃣ Frontend setup
cd ../client
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🌐 Deployment (Render)
🖥️ Backend (Node/Express)

Create a Web Service on Render.

Connect your repo and select /server folder.

Build Command: npm install

Start Command: node index.js

Add environment variable: MONGODB_URI

Example URL: https://compsearch-1.onrender.com

💻 Frontend (React)

Create another Static Site on Render.

Connect your repo and select /client folder.

Build Command: npm run build

Publish Directory: dist

Example URL: https://compsearch.onrender.com

Make sure your frontend’s API calls point to:

https://compsearch-1.onrender.com/api/companies

🧾 API Endpoints
Method	Endpoint	Description
GET	/api/companies	Get all companies with filters and pagination
GET	/api/companies?search=abc	Search companies by keyword
GET	/api/companies?location=USA	Filter by location
GET	/api/companies?industry=Tech	Filter by industry

Response:

{
  "data": [ ... ],
  "meta": {
    "total": 120,
    "page": 1,
    "limit": 9,
    "totalPages": 14,
    "locations": [...],
    "industries": [...]
  }
}

👨‍💻 Author
Shaik Rahim

This project is licensed under the MIT License — feel free to use and modify it.
