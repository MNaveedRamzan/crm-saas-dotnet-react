# CRM SaaS – .NET 8 + React

A **minimal but production-style CRM SaaS demo** built with **ASP.NET Core (.NET 8)** and **React (Vite + TypeScript)**.

This project demonstrates:
- Clean layered backend architecture
- EF Core with SQL Server
- JWT authentication
- Server-side pagination & filtering
- A modern React frontend consuming the API

---

## 🏗 Architecture

### Backend (`./backend`)
- **CrmSaas.Api** – ASP.NET Core Web API (controllers, auth, Swagger)
- **CrmSaas.Application** – DTOs, request models, service interfaces
- **CrmSaas.Domain** – Entities & enums (Customer, Deal, DealStatus)
- **CrmSaas.Infrastructure** – EF Core AppDbContext, service implementations

### Frontend (`./frontend`)
- React + TypeScript (Vite)
- Feature-based folder structure
- Axios API client with interceptors
- Protected routes (JWT)

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

### Authentication
- Login / Register
- JWT-based authentication
- Protected routes
- Clean error handling (no page refresh on login failure)

### Customers
- List customers
- View customer details
- Shows:
  - Name
  - Email
  - Phone
  - Company
  - Associated deals

### Deals
- Create new deals
- List deals with **server-side pagination**
- Filters:
  - Search (title / customer)
  - Customer
  - Status
- Inline **status update** (optimistic UI)
- Pagination controls:
  - Page navigation
  - Page size: `10 / 25 / 50 / 100`

### Dashboard
- Total deals count
- Total revenue
- Deals by status chart
- Top customers by revenue

### Seed Data
Initial seed data is added via **EF Core model seeding**:
- Customers: *Acme Corp*, *Global Tech*
- Sample deals for demo purposes

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

### 2️⃣ Run migrations

#### Option A: Visual Studio (PMC – Recommended)
```powershell
Add-Migration InitialCreate -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
Update-Database -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
```

#### Option B: dotnet-ef CLI
```bash
dotnet ef migrations add InitialCreate \
  -s src/CrmSaas.Api/CrmSaas.Api.csproj \
  -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj

dotnet ef database update \
  -s src/CrmSaas.Api/CrmSaas.Api.csproj \
  -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj
```

### 3️⃣ Run the API
```bash
dotnet run --project src/CrmSaas.Api/CrmSaas.Api.csproj
```

Swagger UI:
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

Frontend runs at:
```
http://localhost:5173
```

---

## 🔧 Configuration

```ts
// src/lib/apiClient.ts
const apiBaseUrl = "https://localhost:7040/api";
```

---

## 📌 Project Status
This project is intended as:
- A **portfolio / demo CRM**
- A reference for clean .NET + React architecture
- A base for extending into a full SaaS (roles, billing, audit logs, etc.)


