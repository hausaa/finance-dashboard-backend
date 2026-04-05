# Finance Dashboard Backend

A backend API for finance data processing and access control, built with Express and MongoDB.

## Features

- User registration and login with JWT authentication
- Role-based access control: `viewer`, `analyst`, `admin`
- Financial record CRUD operations
- Dashboard summary APIs for income, expenses, category totals, trends, and recent activity
- Validation, error handling, and date filtering

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on set values for:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`

3. Start the server:

   ```bash
   npm start
   ```

4. For development with automatic reload:

   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - body: `{ name, email, password, role? }`
- `POST /api/auth/login`
  - body: `{ email, password }`

### User Management (admin only)

- `GET /api/users`
  - List all users
- `GET /api/users/:id`
  - Get a single user
- `POST /api/users`
  - Create a new user
  - body: `{ name, email, password, role?, status? }`
- `PUT /api/users/:id`
  - Update user `name`, `role`, or `status`
- `DELETE /api/users/:id`
  - Delete a user

### Financial Records

- `POST /api/records`
  - Create a record (`admin` only)
- `GET /api/records`
  - List records with optional filters:
    - `type`, `category`, `startDate`, `endDate`, `q`, `page`, `limit`
- `PUT /api/records/:id`
  - Update a record (`admin` only)
- `DELETE /api/records/:id`
  - Delete a record (`admin` only)

### Dashboard

- `GET /api/dashboard/summary`
  - Total income, total expense, net balance
- `GET /api/dashboard/category-summary`
  - Expense totals by category
- `GET /api/dashboard/monthly-trend`
  - Month-by-month totals for income and expense
- `GET /api/dashboard/recent`
  - Most recent records

## Assumptions

- Only `admin` users can manage records and user roles.
- `analyst` users can read records and view dashboard insights.
- `viewer` users can only access dashboard data and summaries.
- MongoDB is used for persistence.

## Notes

- The project structure separates controllers, routes, models, validators, and middleware.
- The system validates incoming data and returns clear error messages for invalid requests.
