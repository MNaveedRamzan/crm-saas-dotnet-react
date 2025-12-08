# CRM SaaS – .NET 8 + React

A minimal but production-style **CRM SaaS demo** built with **ASP.NET Core (.NET 8)** and **React (Vite + TypeScript)**.  
It showcases clean layering, EF Core, and a simple React frontend that consumes the API.

---

## Architecture

**Backend (./backend)**

- `CrmSaas.Api` – ASP.NET Core Web API (controllers, DI, startup)
- `CrmSaas.Application` – DTOs, service interfaces, request models
- `CrmSaas.Domain` – entities & enums (`Customer`, `Deal`, `DealStatus`)
- `CrmSaas.Infrastructure` – EF Core `AppDbContext`, service implementations

**Frontend (./frontend)**

- React + TypeScript (Vite)
- Simple pages to list **Customers** and **Deals**
- Axios-based API client

---

## Tech Stack

- **Backend**
  - .NET 8, ASP.NET Core Web API
  - Entity Framework Core (SQL Server)
  - Clean-ish layered architecture
  - Swagger (OpenAPI)
- **Frontend**
  - React + TypeScript
  - Vite
  - Axios

---

## Features

### Customers

- List customers
- Shows:
  - Name
  - Email
  - Phone
  - Company
  - Number of associated deals

### Deals

- List deals
- Shows:
  - Title
  - Customer name
  - Amount
  - Status (`New`, `InProgress`, `Won`, `Lost`)

> Note: Initial seed data is added via EF Core model seeding  
> (`Acme Corp`, `Global Tech` etc.)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MNaveedRamzan/crm-saas-dotnet-react.git
cd crm-saas-dotnet-react


** Backend setup **
1) cd backend
2)Run migrations (from Visual Studio Package Manager Console or CLI)
# PMC (recommended):
Add-Migration InitialCreate -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure
Update-Database -StartupProject CrmSaas.Api -Project CrmSaas.Infrastructure

Or using dotnet-ef (if installed):

dotnet ef migrations add InitialCreate -s src/CrmSaas.Api/CrmSaas.Api.csproj -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj
dotnet ef database update -s src/CrmSaas.Api/CrmSaas.Api.csproj -p src/CrmSaas.Infrastructure/CrmSaas.Infrastructure.csproj

3)Run the API:
dotnet run --project src/CrmSaas.Api/CrmSaas.Api.csproj

or https://localhost:<port>/swagger

***Frontend setup**
1)cd ../frontend
npm install
npm run dev
http://localhost:5173

2)Make sure src/api.ts uses the correct API base URL, for example:
const api = axios.create({
  baseURL: "https://localhost:7040/api",
});
