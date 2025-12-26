# CRM SaaS – .NET 8 + React

A **production-style CRM SaaS demo** built with **ASP.NET Core (.NET 8)** and **React (Vite + TypeScript)**.

This project demonstrates how to build a clean, scalable full-stack application using modern .NET and React best practices, including authentication, pagination, filtering, and a dashboard.

---

## ✨ Key Highlights

- Clean layered backend architecture
- JWT authentication (login / register)
- Server-side pagination & filtering
- Optimistic UI updates
- Dashboard with charts
- React + TypeScript + Tailwind
- EF Core with SQL Server
- Swagger-enabled API

---

## 🏗 Architecture

### Backend (`/backend`)
- **CrmSaas.Api** – ASP.NET Core Web API, controllers, authentication, Swagger
- **CrmSaas.Application** – DTOs, request models, service interfaces
- **CrmSaas.Domain** – Core entities & enums (`Customer`, `Deal`, `DealStatus`)
- **CrmSaas.Infrastructure** – EF Core `AppDbContext`, migrations, services

### Frontend (`/frontend`)
- React + TypeScript (Vite)
- Feature-based folder structure
- Axios API client with interceptors
- JWT protected routes
- Tailwind CSS UI

---

## 🛠 Tech Stack

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core (SQL Server)
- Swagger / OpenAPI
- JWT Authentication

### Frontend
- React + TypeScript
- Vite
- Axios
- Tailwind CSS
- React Hot Toast

---

## ✨ Features

### 🔐 Authentication
- Login & Register
- JWT-based authentication
- Protected routes
- Clean error handling (no page refresh on login failure)
- Password always cleared on error, email retained

### 👥 Customers
- List customers
- View customer details
- Displays:
  - Name
  - Email
  - Phone
  - Company
  - Associated deals

### 💼 Deals
- Create new deals
- Server-side pagination
- Filters:
  - Search (title / customer)
  - Customer
  - Status
- Inline status update (optimistic UI)
- Pagination options: 10 / 25 / 50 / 100

### 📊 Dashboard
- Total deals count
- Total revenue
- Deals by status chart
- Top customers by revenue

### 🌱 Seed Data
Initial seed data is added using EF Core model seeding:
- Customers: Acme Corp, Global Tech
- Sample deals for demo/testing

---

## 📸 Screenshots

Screenshots are available in the `/screenshots` folder:
- Login & Register
- Dashboard
- Customers & Deals
- Customer Detail view

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MNaveedRamzan/crm-saas-dotnet-react.git
cd crm-saas-dotnet-react
🐳 Run with Docker (Recommended)

This project is fully dockerized and can be run with a single command.

Prerequisites

Docker Desktop installed

Docker engine running (Linux containers)

Start the full stack

From the repository root:

docker compose up --build

Open in browser

Frontend: http://localhost:5173

API (Swagger): http://localhost:5240/swagger

Stop containers
docker compose down

Reset database (clean start)
docker compose down -v


Docker setup includes:

ASP.NET Core .NET 8 API

React frontend served via Nginx

SQL Server container

⚙ Backend Setup (Without Docker)
cd backend

Run database migrations
Option A: Visual Studio (PMC – Recommended)
Add-Migration InitialCreate -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
Update-Database -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure

Option B: dotnet-ef CLI
dotnet ef migrations add InitialCreate \
  -s src/CrmSaas.Api/CrmSaas.Api.csproj \
  -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj

dotnet ef database update \
  -s src/CrmSaas.Api/CrmSaas.Api.csproj \
  -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj

Run the API
dotnet run --project src/CrmSaas.Api/CrmSaas.Api.csproj


Swagger:

https://localhost:<port>/swagger

🎨 Frontend Setup (Without Docker)
cd frontend
npm install
npm run dev


Frontend URL:

http://localhost:5173

🔧 Configuration

The frontend uses environment variables for API configuration.

VITE_API_BASE_URL=http://localhost:5240/api


This allows seamless switching between local and Docker environments.

👤 Author

Naveed Ramzan
GitHub: https://github.com/MNaveedRamzan
