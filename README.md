# CRM SaaS – .NET 8 + React

A **production-style CRM SaaS demo** built with **ASP.NET Core (.NET 8)** and **React (Vite + TypeScript)**.

This project demonstrates how to build a clean, scalable full‑stack application using modern .NET and React best practices, including authentication, pagination, filtering, and a dashboard.

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

Screenshots are available in the `/screenshots` folder.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MNaveedRamzan/crm-saas-dotnet-react.git
cd crm-saas-dotnet-react
```

---

## ⚙ Backend Setup

```bash
cd backend
```

### 2️⃣ Run database migrations

#### Option A: Visual Studio (PMC – Recommended)
```powershell
Add-Migration InitialCreate -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
Update-Database -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
```

#### Option B: dotnet-ef CLI
```bash
dotnet ef migrations add InitialCreate   -s src/CrmSaas.Api/CrmSaas.Api.csproj   -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj

dotnet ef database update   -s src/CrmSaas.Api/CrmSaas.Api.csproj   -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj
```

### 3️⃣ Run the API
```bash
dotnet run --project src/CrmSaas.Api/CrmSaas.Api.csproj
```

Swagger:
```
https://localhost:<port>/swagger
```

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend URL:
```
http://localhost:5173
```

---

## 🔧 Configuration

```ts
// src/lib/apiClient.ts
const apiBaseUrl = "https://localhost:7040/api";
```


