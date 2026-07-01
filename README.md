# 👔 Employee Management System

A full-stack **CRUD** web application for managing employee records, built with a **Spring Boot** REST API backend and a **React + Vite** frontend.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Configuration](#database-configuration)
- [Features](#features)
- [Frontend Pages & Routing](#frontend-pages--routing)
- [Backend Layers](#backend-layers)

---

## Overview

The **Employee Management System (EMS)** is a fullstack application that allows users to:

- View a list of all employees
- Add a new employee
- Update existing employee details
- Delete an employee

The backend exposes a RESTful API consumed by the React frontend via **Axios** HTTP calls.

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 4.1.0 | Application framework |
| Spring Data JPA | — | ORM & database abstraction |
| Spring Web MVC | — | REST API layer |
| MySQL | — | Relational database |
| Lombok | — | Boilerplate code reduction |
| Maven | — | Build & dependency management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| Axios | 1.x | HTTP client for API calls |
| Bootstrap | 5.x | CSS component library |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                     │
│   Browser  →  React Router  →  Pages  →  EmployeeService   │
│                                              │ (Axios)      │
└──────────────────────────────────────────────┼──────────────┘
                                               │ HTTP (JSON)
                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                     │
│                                                             │
│  EmployeeController  (@RestController, /api/employees)      │
│         │                                                   │
│  EmployeeService  (interface + EmployeeServiceImpl)         │
│         │                                                   │
│  EmployeeRepository  (JpaRepository<Employee, Long>)        │
│         │                                                   │
│       MySQL Database  (empjay)                              │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
`React Page` → `EmployeeService.js (Axios)` → `EmployeeController` → `EmployeeServiceImpl` → `EmployeeRepository` → `MySQL`

---

## Project Structure

```
EMP/
├── README.md
│
├── backend/                          # Spring Boot Application
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/demo/
│           │   ├── DemoApplication.java          # Entry point (@SpringBootApplication)
│           │   ├── controller/
│           │   │   └── EmployeeController.java   # REST endpoints
│           │   ├── service/
│           │   │   ├── EmployeeService.java       # Service interface
│           │   │   └── impl/
│           │   │       └── EmployeeServiceImpl.java  # Business logic
│           │   ├── repository/
│           │   │   └── EmployeeRepository.java   # JPA repository
│           │   ├── entity/
│           │   │   └── Employee.java             # JPA entity (DB table)
│           │   ├── dto/
│           │   │   └── EmployeeDto.java          # Data Transfer Object
│           │   ├── mapper/
│           │   │   └── EmployeeMapper.java       # Entity <-> DTO conversion
│           │   └── exception/
│           │       └── ResourceNotFoundException.java  # Custom 404 exception
│           └── resources/
│               └── application.properties        # DB & JPA config
│
└── frontend/                         # React + Vite Application
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx                  # React entry point
        ├── App.jsx                   # Root component & router setup
        ├── components/
        │   ├── Header.jsx            # Top navigation bar
        │   └── Footer.jsx            # Footer bar
        ├── pages/
        │   ├── GetAllEmployees.jsx   # Employee list page (Home)
        │   └── AddEmployee.jsx       # Add / Update employee form
        └── services/
            └── EmployeeService.js    # Axios API call functions
```

---

## API Reference

**Base URL:** `http://localhost:8080/api/employees`

| Method | Endpoint | Description | Request Body | Response |
|---|---|---|---|---|
| `GET` | `/` | Get all employees | — | `200 OK` — `List<EmployeeDto>` |
| `GET` | `/{id}` | Get employee by ID | — | `200 OK` — `EmployeeDto` |
| `POST` | `/` | Create new employee | `EmployeeDto` (JSON) | `201 Created` — `EmployeeDto` |
| `PUT` | `/{id}` | Update employee | `EmployeeDto` (JSON) | `200 OK` — `EmployeeDto` |
| `DELETE` | `/{id}` | Delete employee | — | `200 OK` — success message |

### Employee JSON Schema

```json
{
  "id": 1,
  "firstname": "Jay",
  "lastname": "Rana",
  "email": "jay@example.com"
}
```

> **Note:** CORS is globally enabled (`@CrossOrigin("*")`) to allow the React dev server to communicate with the Spring Boot backend.

---

## Getting Started

### Prerequisites

Make sure the following are installed on your system:

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.6+** — (or use the included `mvnw` wrapper)
- **Node.js 18+** & **npm** — [Download](https://nodejs.org/)
- **MySQL 8+** — [Download](https://dev.mysql.com/downloads/)

---

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd EMP/backend
   ```

2. **Create the MySQL database:**
   ```sql
   CREATE DATABASE empjay;
   ```

3. **Configure credentials** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/empjay
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. **Run the backend:**
   ```bash
   # Using Maven wrapper (recommended)
   ./mvnw spring-boot:run

   # Or on Windows
   mvnw.cmd spring-boot:run
   ```

   The API will start at **`http://localhost:8080`**.

   > Spring JPA with `ddl-auto=update` will **automatically create** the `employees` table on first run.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd EMP/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The React app will be available at **`http://localhost:5173`**.

> Make sure the backend is running at `http://localhost:8080` before using the frontend.

---

## Database Configuration

The application connects to a **MySQL** database named `empjay`.

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/empjay
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update   # Auto-creates/updates table schema
spring.jpa.show-sql=true               # Logs SQL queries to console
spring.jpa.properties.hibernate.format_sql=true
```

### Database Schema (Auto-Generated)

```sql
CREATE TABLE employees (
  id        BIGINT       AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255),
  lastname  VARCHAR(255),
  email     VARCHAR(255)
);
```

---

## Features

- ✅ **List All Employees** — View a paginated table of all employee records
- ✅ **Add Employee** — Form to create a new employee with client-side validation
- ✅ **Update Employee** — Pre-populated form to edit existing employee details
- ✅ **Delete Employee** — Remove an employee record with immediate UI update
- ✅ **Form Validation** — Client-side required-field checks with Bootstrap error feedback
- ✅ **Responsive UI** — Bootstrap 5 grid layout works on all screen sizes
- ✅ **RESTful API** — Clean, standard HTTP methods for all CRUD operations
- ✅ **Custom Exception Handling** — `ResourceNotFoundException` returns HTTP `404` for missing records
- ✅ **DTO Pattern** — Decouples the API contract from the internal JPA entity

---

## Frontend Pages & Routing

Routing is handled by **React Router DOM v7** configured in `App.jsx`.

| Route | Component | Description |
|---|---|---|
| `/` | `GetAllEmployees` | Default home — lists all employees |
| `/employees` | `GetAllEmployees` | Alias for the employee list |
| `/add-employee` | `AddEmployee` | Form to add a new employee |
| `/update-employee/:id` | `AddEmployee` | Pre-filled form to update employee by ID |

> The `AddEmployee` component is reused for both **Add** and **Update** operations. It detects the `id` route param via `useParams()` to determine which mode to operate in.

---

## Backend Layers

The backend follows a clean **layered architecture**:

| Layer | Class | Responsibility |
|---|---|---|
| **Controller** | `EmployeeController` | Handles HTTP requests, maps routes, returns `ResponseEntity` |
| **Service Interface** | `EmployeeService` | Defines the contract for business operations |
| **Service Impl** | `EmployeeServiceImpl` | Implements business logic, throws exceptions |
| **Repository** | `EmployeeRepository` | Extends `JpaRepository` — provides CRUD DB operations |
| **Entity** | `Employee` | JPA-mapped class representing the `employees` DB table |
| **DTO** | `EmployeeDto` | Data Transfer Object used for API request/response bodies |
| **Mapper** | `EmployeeMapper` | Static utility to convert between `Employee` ↔ `EmployeeDto` |
| **Exception** | `ResourceNotFoundException` | Custom `RuntimeException` annotated with `@ResponseStatus(404)` |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using Spring Boot & React*
