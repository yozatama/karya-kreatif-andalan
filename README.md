# Karya Kreatif Andalan

Platform rental mobil dan motor listrik untuk driver online (Gojek, Grab, Maxim, InDrive).

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS 3.x
- shadcn/ui patterns
- Framer Motion
- Zustand (state management)
- TanStack Query (data fetching)
- React Hook Form + Zod (forms)
- Recharts (analytics charts)
- next-themes (dark mode)

### Backend
- NestJS 10
- Prisma ORM 5
- SQLite (dev) / MySQL (production)
- JWT Authentication
- RBAC Authorization
- Swagger/OpenAPI docs

## Project Structure

```
karya-kreatif-andalan/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   │   ├── (public)   # Landing, Fleet, About, etc.
│   │   │   │   ├── auth/      # Login, Register
│   │   │   │   ├── dashboard/ # User dashboard
│   │   │   │   └── admin/     # Admin panel
│   │   │   ├── components/    # React components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── stores/        # Zustand stores
│   │   │   └── lib/           # Utils, mock data
│   │   └── ...
│   └── api/          # NestJS backend
│       ├── src/
│       │   ├── auth/          # Authentication
│       │   ├── users/         # User management
│       │   ├── vehicles/      # Fleet management
│       │   ├── bookings/      # Booking workflow
│       │   ├── payments/      # Payment processing
│       │   ├── admin/         # Admin analytics
│       │   ├── maintenance/   # Vehicle maintenance
│       │   ├── notifications/ # Notifications
│       │   ├── support/       # Support tickets
│       │   └── promos/        # Promotions
│       └── prisma/            # Database schema & seed
└── packages/
    └── shared/       # Shared types & schemas
```

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL (production) or SQLite (development)

### Installation

```bash
# Clone the repository
git clone https://github.com/yozatama/karya-kreatif-andalan.git
cd karya-kreatif-andalan

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env

# Generate Prisma client
pnpm --filter api exec prisma generate

# Push database schema (creates SQLite tables for dev)
pnpm --filter api exec prisma db push

# Seed database with demo data
pnpm --filter api exec prisma db seed

# Start development
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps for production
pnpm lint         # Run linting across all packages
pnpm test         # Run tests
```

## Features

### Public Website
- Landing page with hero, benefits, fleet showcase, pricing, testimonials, FAQ
- Fleet listing with filters (type, price, transmission, availability)
- Vehicle detail with specs, pricing, and earnings calculator
- Blog, FAQ, About, Contact, and Partnership pages
- SEO optimized with metadata, sitemap, and structured data
- Dark mode support
- Mobile-first responsive design

### User Dashboard
- Active rental monitoring
- Multi-step vehicle booking flow
- Digital vehicle checkpoint (photo upload + checklist)
- Payment tracking with Xendit integration
- Driver verification (KTP/SIM/Selfie upload)
- Support center with ticketing

### Admin Panel
- Revenue analytics with interactive charts
- Fleet management (CRUD)
- Booking approval workflow
- User verification management
- Finance module (payments, deposits, penalties, invoices)
- Maintenance scheduling
- Promo/campaign management
- CMS for landing page, blog, FAQ
- Reports and analytics

### AI Features
- Booking assistant chatbot
- Damage detection on vehicle photos
- Driver recommendations (planned)
- Fraud detection (planned)

## API Documentation

When the backend is running, Swagger docs are available at:
```
http://localhost:4000/api/docs
```

## Database

The platform uses Prisma ORM with the following main entities:
- Users & Roles (RBAC)
- Vehicles & Categories
- Bookings & Status tracking
- Payments & Invoices
- Maintenance Logs
- Vehicle Checkpoints
- Documents & Verifications
- Promotions
- Notifications
- Support Tickets

## Deployment

### Frontend (Vercel)
```bash
pnpm --filter web build
# Deploy apps/web to Vercel
```

### Backend (Railway/Fly.io)
```bash
pnpm --filter api build
# Deploy apps/api to Railway or Fly.io
```

### Database
- Development: SQLite (local file)
- Production: MySQL on PlanetScale/Aiven/AWS RDS

## Environment Variables

### Frontend (apps/web/.env)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_URL` - Auth callback URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret

### Backend (apps/api/.env)
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRY` - Token expiry (e.g., "7d")
- `XENDIT_API_KEY` - Xendit payment gateway key
- `CLOUDFLARE_R2_*` - File storage credentials

## License

Private - Karya Kreatif Andalan
