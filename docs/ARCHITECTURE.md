# Architecture Documentation

## System Overview

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|   Next.js 15     |---->|   NestJS API     |---->|   MySQL          |
|   (Frontend)     |     |   (Backend)      |     |   (PlanetScale)  |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
        |                         |
        |                         |
        v                         v
+------------------+     +------------------+
|                  |     |                  |
|   Vercel         |     |   Cloudflare R2  |
|   (Hosting)      |     |   (File Storage) |
|                  |     |                  |
+------------------+     +------------------+
                                  |
                                  v
                          +------------------+
                          |                  |
                          |   Xendit         |
                          |   (Payments)     |
                          |                  |
                          +------------------+
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible, customizable component library
- **Zustand** - Lightweight state management
- **React Hook Form + Zod** - Form handling and validation
- **Framer Motion** - Animations and transitions

### Backend
- **NestJS** - Progressive Node.js framework with modular architecture
- **TypeScript** - Type-safe development
- **Prisma** - Type-safe ORM for database access
- **Passport.js + JWT** - Authentication
- **class-validator** - DTO validation
- **Swagger** - Auto-generated API documentation

### Database
- **MySQL** (PlanetScale) - Serverless MySQL with branching
- **Prisma** - Schema management, migrations, and client generation

### Infrastructure
- **Vercel** - Frontend hosting with edge functions
- **Railway** - Backend API hosting
- **PlanetScale** - Serverless MySQL database
- **Cloudflare R2** - Object storage for files and images
- **Xendit** - Payment gateway for Indonesian market

## Monorepo Structure

```
karya-kreatif-andalan/
|-- apps/
|   |-- web/              # Next.js 15 frontend application
|   |-- backend/          # NestJS API application
|-- packages/
|   |-- database/         # Prisma schema, client, and migrations
|   |-- shared/           # Shared TypeScript types and constants
|   |-- ui/               # Shared UI component library (shadcn-style)
|-- docs/                 # Project documentation
|-- turbo.json            # Turborepo pipeline configuration
|-- pnpm-workspace.yaml   # pnpm workspace configuration
```

### Why Monorepo?

1. **Shared types** - Single source of truth for TypeScript interfaces between frontend and backend
2. **Shared database client** - Prisma client accessible from both apps
3. **Component reuse** - UI components shared across pages
4. **Atomic commits** - Related changes across packages in a single commit
5. **Simplified CI/CD** - Single pipeline for all packages

## Frontend Architecture

### App Router Structure

```
apps/web/src/app/
|-- (public)/             # Public pages (landing, vehicles, about)
|-- (auth)/               # Auth pages (login, register, forgot-password)
|-- dashboard/            # Customer dashboard
|-- admin/                # Admin panel
|   |-- vehicles/
|   |-- bookings/
|   |-- users/
|   |-- payments/
|   |-- maintenance/
|   |-- analytics/
|   |-- support/
|   |-- promos/
|-- api/                  # API route handlers (BFF pattern)
```

### Key Patterns

- **Server Components** - Default for data fetching and SEO
- **Client Components** - For interactive UI (forms, modals, charts)
- **Parallel Routes** - For complex layouts with independent loading states
- **Route Groups** - Organize routes without affecting URL structure
- **Middleware** - Auth checks, redirects, and locale handling

## Backend Architecture

### Module Structure

Each domain module follows this pattern:

```
modules/
|-- auth/
|   |-- auth.module.ts
|   |-- auth.controller.ts
|   |-- auth.service.ts
|   |-- auth.guard.ts
|   |-- dto/
|   |-- strategies/
|-- vehicles/
|   |-- vehicles.module.ts
|   |-- vehicles.controller.ts
|   |-- vehicles.service.ts
|   |-- dto/
|-- bookings/
|   |-- bookings.module.ts
|   |-- bookings.controller.ts
|   |-- bookings.service.ts
|   |-- dto/
```

### Key Patterns

- **Guards** - Role-based access control (RBAC) with custom decorators
- **Interceptors** - Response transformation, logging, caching
- **Pipes** - Input validation using class-validator
- **Filters** - Global exception handling with consistent error format
- **Events** - Domain events for notifications and audit logging

## Database Design

### Design Principles

1. **UUID primary keys** - Avoid sequential ID enumeration
2. **Soft deletes** - isActive flag instead of hard delete for users
3. **Audit trail** - AuditLog table tracks all entity changes
4. **Denormalization** - durationDays, totalAmount stored for query performance
5. **JSON fields** - Flexible data (images, checklist, attachments)

### Indexing Strategy

- Primary keys on all tables (UUID)
- Unique constraints on email, plateNumber, invoiceNumber, promo code
- Foreign key indexes on all relation fields
- Composite indexes on frequently queried combinations (status + date)
- Full-text search considerations for vehicle name/brand/model

## Authentication Flow

```
1. User submits credentials
2. Backend validates against bcrypt hash
3. JWT access token (15min) + refresh token (7d) issued
4. Access token sent in Authorization header
5. Refresh token stored in httpOnly cookie
6. Token refresh happens automatically on 401
7. Logout invalidates refresh token
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full system access |
| ADMIN | Manage vehicles, bookings, users, support |
| FINANCE_ADMIN | View reports, manage payments, invoices |
| MAINTENANCE | Manage maintenance logs, vehicle status |
| DRIVER/CUSTOMER | Create bookings, view own data |

## File Storage (Cloudflare R2)

### Strategy

- Files uploaded via presigned URLs for performance
- Images processed/resized on upload (thumbnails, optimized)
- CDN delivery through Cloudflare for global edge caching
- Folder structure: `/{type}/{year}/{month}/{uuid}.{ext}`

### File Types

| Folder | Purpose | Max Size |
|--------|---------|----------|
| vehicles/ | Vehicle photos | 5MB |
| documents/ | KTP, SIM, Selfie | 5MB |
| avatars/ | User profile pictures | 2MB |
| attachments/ | Support ticket files | 10MB |

## Payment Integration (Xendit)

### Flow

```
1. Customer creates booking
2. Admin approves booking
3. System creates Xendit invoice
4. Customer receives payment link
5. Customer pays via chosen method
6. Xendit sends webhook callback
7. System updates payment status
8. Booking status updated to ACTIVE
```

### Supported Payment Methods

- Bank Transfer (BCA, BNI, BRI, Mandiri)
- Virtual Account
- E-Wallet (GoPay, OVO, DANA, ShopeePay)
- Credit/Debit Card
- Cash (via convenience stores)

## Deployment Topology

```
+-------------------+         +-------------------+
|  GitHub Actions   |-------->|  Vercel           |
|  (CI/CD)          |    |    |  (Frontend)       |
+-------------------+    |    +-------------------+
                         |
                         |--->+-------------------+
                         |    |  Railway          |
                         |    |  (Backend API)    |
                         |    +-------------------+
                         |
                         |--->+-------------------+
                              |  PlanetScale      |
                              |  (Database)       |
                              +-------------------+
```

### Environment Strategy

| Environment | Branch | URL |
|-------------|--------|-----|
| Development | develop | dev.karyakreatif.id |
| Staging | staging | staging.karyakreatif.id |
| Production | main | karyakreatif.id |

### Scaling Considerations

- **Frontend**: Vercel auto-scales with edge network
- **Backend**: Railway horizontal scaling with multiple instances
- **Database**: PlanetScale serverless auto-scaling
- **Storage**: Cloudflare R2 with unlimited scalability
- **Caching**: Redis (Upstash) for session and query caching
