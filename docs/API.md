# API Documentation

## Overview

Base URL: `/api`

Authentication: Bearer token (JWT) in the Authorization header.

```
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "data": [],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## Auth Module

### POST /api/auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "081234567890"
}
```

**Response (201):**

```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER"
  }
}
```

### POST /api/auth/login

Authenticate and receive access token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CUSTOMER"
    }
  }
}
```

### POST /api/auth/refresh

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /api/auth/logout

Invalidate the current session.

### POST /api/auth/forgot-password

Request password reset email.

### POST /api/auth/reset-password

Reset password with token from email.

---

## Users Module

### GET /api/users

List all users (Admin only).

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)
- `search` (string) - Search by name or email
- `role` (string) - Filter by role name

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "081234567890",
      "role": { "id": "uuid", "name": "CUSTOMER" },
      "isVerified": true,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": { "total": 50, "page": 1, "limit": 10, "totalPages": 5 }
}
```

### GET /api/users/:id

Get user details by ID.

### PUT /api/users/:id

Update user profile.

### DELETE /api/users/:id

Deactivate a user account (soft delete).

### GET /api/users/me

Get current authenticated user profile.

### PUT /api/users/me

Update current user's own profile.

---

## Vehicles Module

### GET /api/vehicles

List vehicles with filtering.

**Query Parameters:**
- `page`, `limit` - Pagination
- `category` (string) - Filter by category slug
- `status` (string) - Filter by status (AVAILABLE, RENTED, MAINTENANCE, INACTIVE)
- `transmission` (string) - MANUAL or AUTOMATIC
- `fuelType` (string) - PETROL, DIESEL, ELECTRIC, HYBRID
- `minPrice`, `maxPrice` (number) - Daily rate range
- `seats` (number) - Minimum seats
- `search` (string) - Search by name, brand, or model

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Toyota Avanza 2023",
      "brand": "Toyota",
      "model": "Avanza",
      "year": 2023,
      "plateNumber": "B 2001 KKA",
      "color": "Silver",
      "transmission": "AUTOMATIC",
      "fuelType": "PETROL",
      "seats": 7,
      "status": "AVAILABLE",
      "dailyRate": 300000,
      "weeklyRate": 1800000,
      "monthlyRate": 6500000,
      "depositAmount": 400000,
      "images": ["/vehicles/avanza-1.jpg"],
      "category": { "id": "uuid", "name": "MPV", "slug": "mpv" }
    }
  ],
  "meta": { "total": 20, "page": 1, "limit": 10, "totalPages": 2 }
}
```

### GET /api/vehicles/:id

Get vehicle details.

### POST /api/vehicles

Create a new vehicle (Admin only).

**Request Body:**

```json
{
  "categoryId": "uuid",
  "name": "Toyota Avanza 2023",
  "brand": "Toyota",
  "model": "Avanza",
  "year": 2023,
  "plateNumber": "B 2001 KKA",
  "color": "Silver",
  "transmission": "AUTOMATIC",
  "fuelType": "PETROL",
  "seats": 7,
  "dailyRate": 300000,
  "depositAmount": 400000
}
```

### PUT /api/vehicles/:id

Update vehicle details (Admin only).

### DELETE /api/vehicles/:id

Remove a vehicle (Admin only).

### GET /api/vehicles/categories

List all vehicle categories.

### POST /api/vehicles/categories

Create a vehicle category (Admin only).

---

## Bookings Module

### GET /api/bookings

List bookings. Customers see their own bookings; Admins see all.

**Query Parameters:**
- `page`, `limit` - Pagination
- `status` (string) - Filter by BookingStatus
- `userId` (string) - Filter by user (Admin only)
- `vehicleId` (string) - Filter by vehicle
- `startDate`, `endDate` (ISO date) - Date range filter

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "user": { "id": "uuid", "name": "Budi Santoso" },
      "vehicle": { "id": "uuid", "name": "Toyota Avanza 2023" },
      "startDate": "2024-01-15T00:00:00Z",
      "endDate": "2024-01-18T00:00:00Z",
      "durationDays": 3,
      "totalAmount": 900000,
      "depositAmount": 400000,
      "status": "PENDING",
      "pickupLocation": "Kantor Pusat",
      "returnLocation": "Kantor Pusat"
    }
  ],
  "meta": { "total": 15, "page": 1, "limit": 10, "totalPages": 2 }
}
```

### POST /api/bookings

Create a new booking.

**Request Body:**

```json
{
  "vehicleId": "uuid",
  "startDate": "2024-03-20",
  "endDate": "2024-03-25",
  "pickupLocation": "Kantor Pusat",
  "returnLocation": "Kantor Pusat",
  "notes": "Optional notes"
}
```

### GET /api/bookings/:id

Get booking details.

### PUT /api/bookings/:id/approve

Approve a pending booking (Admin only).

### PUT /api/bookings/:id/reject

Reject a pending booking (Admin only).

### PUT /api/bookings/:id/cancel

Cancel a booking.

### PUT /api/bookings/:id/complete

Mark a booking as completed (Admin only).

---

## Payments Module

### GET /api/payments

List payments.

**Query Parameters:**
- `page`, `limit` - Pagination
- `status` (string) - Filter by PaymentStatus
- `bookingId` (string) - Filter by booking
- `userId` (string) - Filter by user

### POST /api/payments

Create a payment for a booking.

**Request Body:**

```json
{
  "bookingId": "uuid",
  "paymentMethod": "BANK_TRANSFER",
  "paymentChannel": "BCA"
}
```

**Response (201):**

```json
{
  "data": {
    "id": "uuid",
    "amount": 900000,
    "paymentMethod": "BANK_TRANSFER",
    "paymentChannel": "BCA",
    "externalId": "PAY-001-XND",
    "status": "PENDING",
    "paymentUrl": "https://checkout.xendit.co/..."
  }
}
```

### GET /api/payments/:id

Get payment details.

### POST /api/payments/webhook

Xendit payment webhook callback (internal).

---

## Maintenance Module

### GET /api/maintenance

List maintenance logs.

**Query Parameters:**
- `page`, `limit` - Pagination
- `vehicleId` (string) - Filter by vehicle
- `type` (string) - Filter by MaintenanceType

### POST /api/maintenance

Create a maintenance log entry (Admin/Maintenance staff only).

**Request Body:**

```json
{
  "vehicleId": "uuid",
  "type": "ROUTINE",
  "description": "Ganti oli mesin dan filter udara",
  "cost": 750000,
  "performedAt": "2024-01-10T00:00:00Z",
  "nextMaintenanceAt": "2024-04-10T00:00:00Z"
}
```

### GET /api/maintenance/:id

Get maintenance log details.

### PUT /api/maintenance/:id

Update a maintenance log entry.

---

## Notifications Module

### GET /api/notifications

List notifications for the current user.

**Query Parameters:**
- `page`, `limit` - Pagination
- `isRead` (boolean) - Filter by read status
- `type` (string) - Filter by NotificationType

### PUT /api/notifications/:id/read

Mark a notification as read.

### PUT /api/notifications/read-all

Mark all notifications as read.

### GET /api/notifications/unread-count

Get count of unread notifications.

---

## Promos Module

### GET /api/promos

List active promos.

### POST /api/promos

Create a promo (Admin only).

**Request Body:**

```json
{
  "code": "NEWDRIVER",
  "name": "Driver Baru",
  "description": "Diskon 20% untuk driver baru",
  "discountType": "PERCENTAGE",
  "discountValue": 20,
  "minRentalDays": 1,
  "maxDiscount": 200000,
  "usageLimit": 100,
  "validFrom": "2024-01-01",
  "validUntil": "2024-12-31"
}
```

### GET /api/promos/:id

Get promo details.

### PUT /api/promos/:id

Update a promo (Admin only).

### DELETE /api/promos/:id

Deactivate a promo (Admin only).

### POST /api/promos/validate

Validate a promo code for a booking.

**Request Body:**

```json
{
  "code": "NEWDRIVER",
  "rentalDays": 3,
  "totalAmount": 900000
}
```

---

## Support Module

### GET /api/support/tickets

List support tickets. Customers see their own; Admins see all.

**Query Parameters:**
- `page`, `limit` - Pagination
- `status` (string) - Filter by TicketStatus
- `category` (string) - Filter by TicketCategory
- `priority` (string) - Filter by TicketPriority

### POST /api/support/tickets

Create a support ticket.

**Request Body:**

```json
{
  "subject": "Masalah pembayaran",
  "description": "Detail masalah...",
  "category": "PAYMENT_ISSUE",
  "priority": "HIGH"
}
```

### GET /api/support/tickets/:id

Get ticket details with messages.

### PUT /api/support/tickets/:id

Update ticket status or assignment (Admin only).

### POST /api/support/tickets/:id/messages

Add a message to a ticket.

**Request Body:**

```json
{
  "message": "Response text here",
  "attachments": ["/uploads/file.jpg"]
}
```

---

## Analytics Module (Admin only)

### GET /api/analytics/dashboard

Get dashboard overview statistics.

**Response (200):**

```json
{
  "data": {
    "totalVehicles": 20,
    "activeBookings": 5,
    "totalRevenue": 25000000,
    "totalCustomers": 50,
    "vehicleUtilization": 0.75,
    "revenueByMonth": [...],
    "bookingsByStatus": {...}
  }
}
```

### GET /api/analytics/revenue

Get revenue analytics with date range filtering.

### GET /api/analytics/vehicles

Get vehicle performance analytics.

### GET /api/analytics/bookings

Get booking trend analytics.

---

## Upload Module

### POST /api/upload

Upload a file to Cloudflare R2 storage.

**Request:** multipart/form-data with `file` field.

**Query Parameters:**
- `folder` (string) - Destination folder (vehicles, documents, avatars, attachments)

**Response (201):**

```json
{
  "data": {
    "url": "https://cdn.karyakreatif.id/vehicles/abc123.jpg",
    "key": "vehicles/abc123.jpg",
    "size": 245000,
    "mimeType": "image/jpeg"
  }
}
```

### DELETE /api/upload/:key

Delete an uploaded file.

---

## Common HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 409 | Conflict - Duplicate resource |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

## Rate Limiting

- General endpoints: 100 requests per minute
- Auth endpoints: 10 requests per minute
- Upload endpoints: 20 requests per minute
