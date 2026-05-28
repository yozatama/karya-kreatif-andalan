# Database Documentation

## Overview

The database uses MySQL (PlanetScale) managed through Prisma ORM. All IDs are UUIDs. The schema uses snake_case for database columns with camelCase mapping in the Prisma client.

## Entity Descriptions

### roles

Stores system roles for role-based access control.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| name | VARCHAR(255) | UNIQUE | Role name (SUPER_ADMIN, ADMIN, etc.) |
| description | VARCHAR(255) | NULLABLE | Human-readable description |

### users

Core user accounts for all system participants.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| email | VARCHAR(255) | UNIQUE, INDEX | User email address |
| phone | VARCHAR(255) | NULLABLE | Phone number |
| name | VARCHAR(255) | - | Full name |
| password_hash | VARCHAR(255) | - | Bcrypt hashed password |
| role_id | VARCHAR(36) | FK -> roles.id, INDEX | Reference to role |
| avatar_url | VARCHAR(255) | NULLABLE | Profile picture URL |
| is_verified | BOOLEAN | DEFAULT false | Document verification status |
| is_active | BOOLEAN | DEFAULT true | Account active status |
| created_at | DATETIME | DEFAULT now() | Record creation timestamp |
| updated_at | DATETIME | Auto-updated | Last modification timestamp |

### vehicle_categories

Classification groups for vehicles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| name | VARCHAR(255) | - | Category display name |
| slug | VARCHAR(255) | UNIQUE | URL-friendly identifier |
| description | VARCHAR(255) | NULLABLE | Category description |
| icon | VARCHAR(255) | NULLABLE | Icon identifier |

### vehicles

All rentable vehicles in the fleet.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| category_id | VARCHAR(36) | FK, INDEX | Reference to vehicle_categories |
| name | VARCHAR(255) | - | Display name |
| brand | VARCHAR(255) | - | Manufacturer brand |
| model | VARCHAR(255) | - | Model name |
| year | INT | - | Manufacturing year |
| plate_number | VARCHAR(255) | UNIQUE, INDEX | License plate |
| color | VARCHAR(255) | - | Vehicle color |
| transmission | ENUM | - | MANUAL, AUTOMATIC |
| fuel_type | ENUM | - | PETROL, DIESEL, ELECTRIC, HYBRID |
| seats | INT | - | Passenger capacity |
| status | ENUM | INDEX, DEFAULT AVAILABLE | AVAILABLE, RENTED, MAINTENANCE, INACTIVE |
| daily_rate | DECIMAL(12,2) | - | Daily rental price (IDR) |
| weekly_rate | DECIMAL(12,2) | NULLABLE | Weekly rental price |
| monthly_rate | DECIMAL(12,2) | NULLABLE | Monthly rental price |
| deposit_amount | DECIMAL(12,2) | - | Required deposit |
| images | JSON | NULLABLE | Array of image URLs |
| description | TEXT | NULLABLE | Detailed description |
| is_available | BOOLEAN | DEFAULT true | Quick availability flag |
| mileage | INT | DEFAULT 0 | Current odometer reading (km) |
| created_at | DATETIME | DEFAULT now() | Record creation |
| updated_at | DATETIME | Auto-updated | Last modification |

### bookings

Rental booking records linking users to vehicles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK -> users.id, INDEX | Customer reference |
| vehicle_id | VARCHAR(36) | FK -> vehicles.id, INDEX | Vehicle reference |
| start_date | DATETIME | - | Rental start date |
| end_date | DATETIME | - | Rental end date |
| duration_days | INT | - | Calculated rental duration |
| total_amount | DECIMAL(12,2) | - | Total rental cost |
| deposit_amount | DECIMAL(12,2) | - | Required deposit |
| status | ENUM | INDEX, DEFAULT PENDING | Booking lifecycle state |
| pickup_location | VARCHAR(255) | NULLABLE | Vehicle pickup point |
| return_location | VARCHAR(255) | NULLABLE | Vehicle return point |
| notes | TEXT | NULLABLE | Additional notes |
| approved_by | VARCHAR(36) | FK -> users.id, NULLABLE | Admin who approved |
| approved_at | DATETIME | NULLABLE | Approval timestamp |
| created_at | DATETIME | DEFAULT now() | Record creation |
| updated_at | DATETIME | Auto-updated | Last modification |

### payments

Payment transactions for bookings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| booking_id | VARCHAR(36) | FK -> bookings.id, INDEX | Related booking |
| user_id | VARCHAR(36) | FK -> users.id, INDEX | Payer reference |
| amount | DECIMAL(12,2) | - | Payment amount (IDR) |
| payment_method | ENUM | - | Payment method type |
| payment_channel | VARCHAR(255) | NULLABLE | Specific channel (BCA, GoPay, etc.) |
| external_id | VARCHAR(255) | NULLABLE | Xendit transaction ID |
| status | ENUM | INDEX, DEFAULT PENDING | Payment status |
| paid_at | DATETIME | NULLABLE | Payment confirmation time |
| expired_at | DATETIME | NULLABLE | Payment expiration time |
| created_at | DATETIME | DEFAULT now() | Record creation |
| updated_at | DATETIME | Auto-updated | Last modification |

### invoices

Generated invoices for bookings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| booking_id | VARCHAR(36) | FK, INDEX | Related booking |
| user_id | VARCHAR(36) | FK, INDEX | Invoice recipient |
| invoice_number | VARCHAR(255) | UNIQUE | Sequential invoice number |
| amount | DECIMAL(12,2) | - | Base amount |
| tax_amount | DECIMAL(12,2) | - | Tax (PPN 11%) |
| total_amount | DECIMAL(12,2) | - | Total with tax |
| status | ENUM | DEFAULT DRAFT | Invoice status |
| due_date | DATETIME | - | Payment due date |
| paid_at | DATETIME | NULLABLE | Payment date |
| created_at | DATETIME | DEFAULT now() | Record creation |

### penalties

Additional charges for violations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| booking_id | VARCHAR(36) | FK, INDEX | Related booking |
| user_id | VARCHAR(36) | FK, INDEX | Charged user |
| type | ENUM | - | LATE_RETURN, DAMAGE, TRAFFIC_VIOLATION, FUEL_SHORTAGE, OTHER |
| description | TEXT | NULLABLE | Details of the penalty |
| amount | DECIMAL(12,2) | - | Penalty amount (IDR) |
| status | ENUM | DEFAULT PENDING | PENDING, PAID, WAIVED |
| created_at | DATETIME | DEFAULT now() | Record creation |

### maintenance_logs

Vehicle maintenance and repair records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| vehicle_id | VARCHAR(36) | FK, INDEX | Vehicle reference |
| type | ENUM | - | ROUTINE, REPAIR, INSPECTION, EMERGENCY |
| description | TEXT | NULLABLE | Work description |
| cost | DECIMAL(12,2) | - | Maintenance cost (IDR) |
| performed_by | VARCHAR(255) | NULLABLE | Mechanic/technician name |
| performed_at | DATETIME | - | When work was done |
| next_maintenance_at | DATETIME | NULLABLE | Scheduled next maintenance |
| created_at | DATETIME | DEFAULT now() | Record creation |

### vehicle_checkpoints

Vehicle condition records at pickup and return.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| booking_id | VARCHAR(36) | FK, INDEX | Related booking |
| user_id | VARCHAR(36) | FK, INDEX | User who performed check |
| type | ENUM | - | PICKUP or RETURN |
| front_photo | VARCHAR(255) | NULLABLE | Front view photo URL |
| back_photo | VARCHAR(255) | NULLABLE | Rear view photo URL |
| left_photo | VARCHAR(255) | NULLABLE | Left side photo URL |
| right_photo | VARCHAR(255) | NULLABLE | Right side photo URL |
| interior_photo | VARCHAR(255) | NULLABLE | Interior photo URL |
| odometer_photo | VARCHAR(255) | NULLABLE | Odometer reading photo |
| odometer_value | INT | NULLABLE | Odometer reading |
| fuel_level | INT | NULLABLE | Fuel level percentage |
| notes | TEXT | NULLABLE | Additional observations |
| checklist_data | JSON | NULLABLE | Structured checklist |
| created_at | DATETIME | DEFAULT now() | Record creation |

### documents

User uploaded verification documents.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK, INDEX | Document owner |
| type | ENUM | INDEX | KTP, SIM, SELFIE |
| file_url | VARCHAR(255) | - | Document file URL |
| status | ENUM | DEFAULT PENDING | PENDING, APPROVED, REJECTED |
| rejected_reason | VARCHAR(255) | NULLABLE | Reason if rejected |
| verified_by | VARCHAR(36) | FK, NULLABLE | Admin who verified |
| verified_at | DATETIME | NULLABLE | Verification timestamp |
| created_at | DATETIME | DEFAULT now() | Record creation |

### driver_verifications

Overall driver verification status.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK, UNIQUE, INDEX | Driver reference |
| ktp_document_id | VARCHAR(36) | FK, NULLABLE | KTP document reference |
| sim_document_id | VARCHAR(36) | FK, NULLABLE | SIM document reference |
| selfie_document_id | VARCHAR(36) | FK, NULLABLE | Selfie document reference |
| status | ENUM | INDEX, DEFAULT PENDING | PENDING, APPROVED, REJECTED |
| verified_by | VARCHAR(36) | FK, NULLABLE | Admin who verified |
| verified_at | DATETIME | NULLABLE | Verification timestamp |
| notes | TEXT | NULLABLE | Verification notes |
| created_at | DATETIME | DEFAULT now() | Record creation |
| updated_at | DATETIME | Auto-updated | Last modification |

### promos

Promotional discount codes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| code | VARCHAR(255) | UNIQUE, INDEX | Promo code |
| name | VARCHAR(255) | - | Display name |
| description | TEXT | NULLABLE | Promo description |
| discount_type | ENUM | - | PERCENTAGE or FIXED |
| discount_value | DECIMAL(12,2) | - | Discount value |
| min_rental_days | INT | NULLABLE | Minimum days to qualify |
| max_discount | DECIMAL(12,2) | NULLABLE | Maximum discount cap |
| usage_limit | INT | NULLABLE | Max total uses |
| used_count | INT | DEFAULT 0 | Current usage count |
| valid_from | DATETIME | - | Start date |
| valid_until | DATETIME | - | End date |
| is_active | BOOLEAN | DEFAULT true | Active status |
| created_at | DATETIME | DEFAULT now() | Record creation |

### notifications

In-app notifications for users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK, INDEX | Recipient |
| title | VARCHAR(255) | - | Notification title |
| message | TEXT | - | Notification body |
| type | ENUM | - | BOOKING, PAYMENT, PROMO, SYSTEM, VERIFICATION |
| is_read | BOOLEAN | INDEX, DEFAULT false | Read status |
| data | JSON | NULLABLE | Additional structured data |
| created_at | DATETIME | DEFAULT now() | Record creation |

### support_tickets

Customer support tickets.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK, INDEX | Ticket creator |
| subject | VARCHAR(255) | - | Ticket subject |
| description | TEXT | - | Issue description |
| category | ENUM | - | Issue category |
| priority | ENUM | DEFAULT MEDIUM | LOW, MEDIUM, HIGH, URGENT |
| status | ENUM | INDEX, DEFAULT OPEN | OPEN, IN_PROGRESS, RESOLVED, CLOSED |
| assigned_to | VARCHAR(36) | FK, NULLABLE | Assigned admin |
| created_at | DATETIME | DEFAULT now() | Record creation |
| updated_at | DATETIME | Auto-updated | Last modification |

### support_messages

Messages within support tickets.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| ticket_id | VARCHAR(36) | FK, INDEX | Parent ticket |
| sender_id | VARCHAR(36) | FK | Message author |
| message | TEXT | - | Message content |
| attachments | JSON | NULLABLE | Array of file URLs |
| created_at | DATETIME | DEFAULT now() | Record creation |

### audit_logs

System-wide audit trail for compliance and debugging.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | VARCHAR(36) | PK, UUID | Unique identifier |
| user_id | VARCHAR(36) | FK, INDEX, NULLABLE | Actor |
| action | VARCHAR(255) | - | Action performed (CREATE, UPDATE, DELETE) |
| entity_type | VARCHAR(255) | INDEX | Affected entity type |
| entity_id | VARCHAR(36) | NULLABLE | Affected entity ID |
| old_values | JSON | NULLABLE | Previous state |
| new_values | JSON | NULLABLE | New state |
| ip_address | VARCHAR(255) | NULLABLE | Request IP address |
| created_at | DATETIME | DEFAULT now() | Record creation |

## Relationships

```
Role 1--* User
User 1--* Booking
User 1--* Payment
User 1--* Document
User 1--1 DriverVerification
User 1--* Notification
User 1--* SupportTicket (creator)
User 1--* SupportTicket (assignee)
User 1--* SupportMessage
User 1--* AuditLog
User 1--* Booking (approver)

VehicleCategory 1--* Vehicle
Vehicle 1--* Booking
Vehicle 1--* MaintenanceLog

Booking 1--* Payment
Booking 1--* Invoice
Booking 1--* Penalty
Booking 1--* VehicleCheckpoint

SupportTicket 1--* SupportMessage
```

## Index Strategy

### Primary Indexes
- All tables use UUID primary keys

### Unique Indexes
- users.email
- vehicles.plate_number
- vehicle_categories.slug
- invoices.invoice_number
- promos.code

### Foreign Key Indexes
- All FK columns are indexed for JOIN performance

### Query Optimization Indexes
- vehicles.status - Filter available vehicles
- bookings.status - Dashboard queries
- payments.status - Payment reconciliation
- notifications.is_read - Unread count queries
- support_tickets.status - Open ticket queries
- audit_logs.entity_type - Entity history queries

## Enum Values

### UserRole
SUPER_ADMIN, ADMIN, CUSTOMER

### VehicleStatus
AVAILABLE, RENTED, MAINTENANCE, INACTIVE

### TransmissionType
MANUAL, AUTOMATIC

### FuelType
PETROL, DIESEL, ELECTRIC, HYBRID

### BookingStatus
PENDING, APPROVED, ACTIVE, COMPLETED, CANCELLED, REJECTED

### PaymentStatus
PENDING, PAID, FAILED, EXPIRED, REFUNDED

### PaymentMethod
BANK_TRANSFER, VIRTUAL_ACCOUNT, EWALLET, CREDIT_CARD, CASH

### InvoiceStatus
DRAFT, ISSUED, PAID, OVERDUE, CANCELLED

### PenaltyType
LATE_RETURN, DAMAGE, TRAFFIC_VIOLATION, FUEL_SHORTAGE, OTHER

### PenaltyStatus
PENDING, PAID, WAIVED

### MaintenanceType
ROUTINE, REPAIR, INSPECTION, EMERGENCY

### CheckpointType
PICKUP, RETURN

### DocumentType
KTP, SIM, SELFIE

### DocumentStatus
PENDING, APPROVED, REJECTED

### VerificationStatus
PENDING, APPROVED, REJECTED

### DiscountType
PERCENTAGE, FIXED

### NotificationType
BOOKING, PAYMENT, PROMO, SYSTEM, VERIFICATION

### TicketCategory
BOOKING_ISSUE, PAYMENT_ISSUE, VEHICLE_ISSUE, ACCOUNT_ISSUE, OTHER

### TicketPriority
LOW, MEDIUM, HIGH, URGENT

### TicketStatus
OPEN, IN_PROGRESS, RESOLVED, CLOSED

## Sample Queries

### Get available vehicles by category

```sql
SELECT v.*, vc.name as category_name
FROM vehicles v
JOIN vehicle_categories vc ON v.category_id = vc.id
WHERE v.status = 'AVAILABLE'
  AND v.is_available = true
  AND vc.slug = 'mpv'
ORDER BY v.daily_rate ASC;
```

### Get booking with full details

```sql
SELECT b.*, u.name as customer_name, v.name as vehicle_name,
       p.status as payment_status, p.paid_at
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN vehicles v ON b.vehicle_id = v.id
LEFT JOIN payments p ON p.booking_id = b.id
WHERE b.id = '<booking-uuid>';
```

### Revenue report by month

```sql
SELECT DATE_FORMAT(p.paid_at, '%Y-%m') as month,
       COUNT(*) as transaction_count,
       SUM(p.amount) as total_revenue
FROM payments p
WHERE p.status = 'PAID'
  AND p.paid_at >= '2024-01-01'
GROUP BY DATE_FORMAT(p.paid_at, '%Y-%m')
ORDER BY month;
```

### Vehicle utilization rate

```sql
SELECT v.name, v.plate_number,
       COUNT(b.id) as total_bookings,
       SUM(b.duration_days) as total_days_rented,
       SUM(b.total_amount) as total_revenue
FROM vehicles v
LEFT JOIN bookings b ON b.vehicle_id = v.id AND b.status IN ('COMPLETED', 'ACTIVE')
GROUP BY v.id
ORDER BY total_revenue DESC;
```

### Unread notifications count

```sql
SELECT COUNT(*) as unread_count
FROM notifications
WHERE user_id = '<user-uuid>'
  AND is_read = false;
```
