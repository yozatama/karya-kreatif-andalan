# Karya Kreatif Andalan

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Platform rental mobil dan motor listrik untuk driver online. Kelola armada kendaraan, booking, pembayaran, dan operasional dalam satu platform terintegrasi.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| Backend | NestJS, Prisma ORM, Passport.js (JWT) |
| Database | MySQL (PlanetScale) |
| Storage | Cloudflare R2 |
| Payments | Xendit |
| Monorepo | pnpm workspaces, Turborepo |
| Deployment | Vercel (web), Railway (API), PlanetScale (DB) |

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 10
- MySQL 8+ (or PlanetScale account)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/karya-kreatif-andalan.git
cd karya-kreatif-andalan

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/backend/.env.example apps/backend/.env

# Generate Prisma client
pnpm --filter database generate

# Push database schema (development)
pnpm --filter database db:push

# Seed database with demo data
pnpm --filter database seed

# Start development servers
pnpm dev
```
## Environment Variables

### Backend (apps/backend/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | MySQL connection string | mysql://user:pass@host:3306/db |
| JWT_SECRET | JWT signing secret | your-secret-key |
| JWT_REFRESH_SECRET | Refresh token secret | your-refresh-secret |
| JWT_EXPIRATION | Access token TTL | 15m |
| JWT_REFRESH_EXPIRATION | Refresh token TTL | 7d |
| XENDIT_SECRET_KEY | Xendit API secret key | xnd_production_... |
| XENDIT_WEBHOOK_TOKEN | Xendit webhook verification | your-webhook-token |
| R2_ACCOUNT_ID | Cloudflare account ID | your-account-id |
| R2_ACCESS_KEY_ID | R2 access key | your-access-key |
| R2_SECRET_ACCESS_KEY | R2 secret key | your-secret-key |
| R2_BUCKET_NAME | R2 bucket name | karya-kreatif |
| R2_PUBLIC_URL | CDN URL for R2 | https://cdn.karyakreatif.id |

### Frontend (apps/web/.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3001/api |
| NEXT_PUBLIC_APP_URL | Frontend app URL | http://localhost:3000 |
| NEXTAUTH_SECRET | NextAuth session secret | your-nextauth-secret |
| NEXTAUTH_URL | NextAuth base URL | http://localhost:3000 |

## Project Structure

```
karya-kreatif-andalan/
|-- apps/
|   |-- web/                    # Next.js 15 frontend
|   |   |-- src/
|   |   |   |-- app/            # App Router pages
|   |   |   |-- components/     # Page-specific components
|   |   |   |-- hooks/          # Custom React hooks
|   |   |   |-- lib/            # Utilities and configurations
|   |   |   |-- stores/         # Zustand state stores
|   |   |-- public/             # Static assets
|   |-- backend/                # NestJS API
|       |-- src/
|           |-- modules/        # Feature modules
|           |   |-- auth/       # Authentication
|           |   |-- users/      # User management
|           |   |-- vehicles/   # Vehicle management
|           |   |-- bookings/   # Booking system
|           |   |-- payments/   # Payment processing
|           |-- common/         # Shared utilities, guards, pipes
|           |-- config/         # App configuration
|-- packages/
|   |-- database/               # Prisma schema and client
|   |   |-- prisma/
|   |   |   |-- schema.prisma   # Database schema
|   |   |   |-- seed.ts         # Database seeder
|   |   |-- src/
|   |       |-- index.ts        # Prisma client export
|   |-- shared/                 # Shared TypeScript types
|   |-- ui/                     # Shared UI components (shadcn-style)
|-- docs/                       # Project documentation
|   |-- API.md                  # REST API reference
|   |-- ARCHITECTURE.md         # System architecture
|   |-- DATABASE.md             # Database schema docs
|   |-- FLOWS.md                # Application flow diagrams
|-- turbo.json                  # Turborepo configuration
|-- pnpm-workspace.yaml         # Workspace definition
|-- tsconfig.json               # Root TypeScript config
```
## Available Scripts

### Root Level

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run all tests |
| `pnpm clean` | Clean all build artifacts |

### Backend (apps/backend)

| Command | Description |
|---------|-------------|
| `pnpm --filter backend dev` | Start backend in watch mode |
| `pnpm --filter backend build` | Build for production |
| `pnpm --filter backend test` | Run unit tests |
| `pnpm --filter backend test:e2e` | Run end-to-end tests |

### Frontend (apps/web)

| Command | Description |
|---------|-------------|
| `pnpm --filter web dev` | Start frontend dev server |
| `pnpm --filter web build` | Build for production |
| `pnpm --filter web lint` | Lint frontend code |

### Database (packages/database)

| Command | Description |
|---------|-------------|
| `pnpm --filter database generate` | Generate Prisma client |
| `pnpm --filter database db:push` | Push schema to database |
| `pnpm --filter database seed` | Seed database with demo data |
| `pnpm --filter database prisma studio` | Open Prisma Studio GUI |

## Development Workflow

1. Create a feature branch from `main`
2. Make changes following the existing code patterns
3. Ensure TypeScript types are correct (`pnpm build`)
4. Run tests (`pnpm test`)
5. Run linting (`pnpm lint`)
6. Create a pull request

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting
- Conventional commits for git messages

### Adding a New Module (Backend)

```bash
# Generate a new NestJS module
cd apps/backend
nest generate module modules/new-feature
nest generate controller modules/new-feature
nest generate service modules/new-feature
```

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set root directory to `apps/web`
3. Set build command: `cd ../.. && pnpm build --filter=web`
4. Set output directory: `apps/web/.next`
5. Add environment variables

### Backend (Railway)

1. Connect repository to Railway
2. Set root directory to `apps/backend`
3. Set build command: `pnpm --filter backend build`
4. Set start command: `node dist/main.js`
5. Add environment variables
6. Set up health check endpoint: `/api/health`

### Database (PlanetScale)

1. Create a PlanetScale database
2. Copy connection string to backend .env
3. Run `pnpm --filter database db:push` to sync schema
4. Run `pnpm --filter database seed` for initial data
5. Enable safe migrations for production branches

### File Storage (Cloudflare R2)

1. Create an R2 bucket in Cloudflare dashboard
2. Set up public access domain (CDN)
3. Generate API tokens (access key + secret)
4. Configure CORS policy for uploads
5. Add credentials to backend environment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `chore:` - Build/tooling changes
- `refactor:` - Code restructuring
- `test:` - Adding/updating tests
- `perf:` - Performance improvement

## Documentation

- [API Reference](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE.md)
- [Application Flows](./docs/FLOWS.md)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
