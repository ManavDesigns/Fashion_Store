# Fashion Store: Project Overview

This document summarizes the architecture, technology stack, and directory structure of the Fashion Store project.

## 1. Project Architecture
The project follows a **decoupled (Headless)** architecture:
- **Backend**: A robust, Laravel-based commerce engine powered by **Bagisto**.
- **Frontend**: A modern, high-performance web application built with **Next.js**.

The two layers communicate primarily via a **GraphQL API**, with some fallback to REST for specific features like cart management and authentication.

---

## 2. Technology Stack

### Frontend
- **Framework**: Next.js 16.2.2 (App Router)
- **UI Library**: React 19.4.2
- **Styling**: Tailwind CSS 4.2.2
- **Data Fetching**: Apollo Client & Native Fetch API
- **Icons**: Lucide React

### Backend
- **Framework**: Laravel 12.0
- **Commerce Engine**: Bagisto (Webkul)
- **PHP**: ^8.3
- **API Engine**: API Platform (providing GraphQL support)
- **Database**: MySQL (standard Laravel setup)

---

## 3. Directory Structure

### Root
- `/frontend`: Next.js application source.
- `/backend`: Laravel/Bagisto application source.
- `PROJECT_SUMMARY.md`: This document.
- `BAGISTO_GRAPHQL.md`: Technical documentation for the API layer.

### Frontend (`/frontend/src`)
- `app/`: Contains the different pages (Home, Men, Women, Search, Account, etc.).
- `components/`: Reusable UI parts (Product cards, Sidebars, Filters).
- `context/`: Global state management for **Cart** and **Wishlist**.
- `lib/`: Utility libraries for Bagisto integration (`bagisto.js`) and Apollo setup.

### Backend (`/backend`)
- `app/`: Custom application logic, including the `ProductFrontendController`.
- `packages/Webkul/`: Core Bagisto modules.
- `routes/`: Definition for web and API routes.
- `config/`: Configuration for CORS, API Platform, and other services.

---

## 4. Key Files
- `frontend/src/lib/bagisto.js`: The "brain" of the frontend integration; handles all API calls.
- `BAGISTO_GRAPHQL.md`: Detailed breakdown of all GraphQL queries and data flows.
- `backend/config/cors.php`: Manages cross-origin resource sharing between layers.
- `frontend/.env.local`: Stores connection strings and API keys.
