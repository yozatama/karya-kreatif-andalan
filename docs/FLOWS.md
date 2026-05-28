# Application Flows

## Authentication Flow

### Registration

```
Customer                    Backend                     Database
   |                          |                           |
   |-- POST /auth/register -->|                           |
   |                          |-- Validate input -------->|
   |                          |-- Check email unique ---->|
   |                          |-- Hash password --------->|
   |                          |-- Create user record ---->|
   |                          |-- Assign CUSTOMER role -->|
   |                          |                           |
   |<--- 201 + user data -----|                           |
   |                          |                           |
   |-- Upload documents ----->|                           |
   |                          |-- Store in R2 ----------->|
   |                          |-- Create doc records ---->|
   |                          |                           |
   |<--- Verification pending-|                           |
```

### Login

```
Customer                    Backend                     Database
   |                          |                           |
   |-- POST /auth/login ----->|                           |
   |                          |-- Find user by email ---->|
   |                          |-- Verify bcrypt hash ---->|
   |                          |-- Generate JWT tokens --->|
   |                          |-- Log audit entry ------->|
   |                          |                           |
   |<--- 200 + tokens --------|                           |
   |                          |                           |
   |-- GET /users/me -------->|                           |
   |   (Bearer token)         |-- Verify JWT ----------->|
   |                          |-- Fetch user + role ----->|
   |                          |                           |
   |<--- 200 + profile -------|                           |
```

### Token Refresh

```
Customer                    Backend                     Database
   |                          |                           |
   |-- Request with token --->|                           |
   |<--- 401 Unauthorized ----|                           |
   |                          |                           |
   |-- POST /auth/refresh --->|                           |
   |   (refresh token)        |-- Verify refresh token ->|
   |                          |-- Issue new tokens ------>|
   |                          |                           |
   |<--- 200 + new tokens ----|                           |
   |                          |                           |
   |-- Retry original req --->|                           |
   |<--- 200 Success ---------|                           |
```

---

## Booking Flow

### Creating a Booking

```
Customer                    Backend                     Database
   |                          |                           |
   |-- Browse vehicles ------>|                           |
   |<--- Vehicle list --------|                           |
   |                          |                           |
   |-- Select vehicle ------->|                           |
   |-- Choose dates --------->|                           |
   |                          |                           |
   |-- POST /bookings ------->|                           |
   |                          |-- Check availability ---->|
   |                          |-- Calculate pricing ----->|
   |                          |   (daily x days)         |
   |                          |-- Apply promo (if any) -->|
   |                          |-- Create booking -------->|
   |                          |   (status: PENDING)      |
   |                          |-- Send notification ----->|
   |                          |   (to admins)            |
   |                          |                           |
   |<--- 201 + booking data --|                           |
```

### Booking State Machine

```
                    +--------+
           +------->|PENDING |<------+
           |        +----+---+       |
           |             |           |
     (customer)    (admin action)    |
      cancels           |            |
           |     +------+------+     |
           |     |             |     |
           v     v             v     |
     +---------+   +--------+       |
     |CANCELLED|   |APPROVED|       |
     +---------+   +----+---+       |
                        |            |
                  (payment done)     |
                        |        (admin rejects)
                        v            |
                   +----+---+        |
                   | ACTIVE |        |
                   +----+---+   +----+----+
                        |       |REJECTED |
                  (return done) +---------+
                        |
                        v
                   +----+-----+
                   |COMPLETED |
                   +----------+
```

### Pricing Calculation

```
1. Get vehicle daily rate
2. Calculate duration = endDate - startDate (days)
3. Base price = dailyRate x durationDays
4. If duration >= 7 and weeklyRate exists:
   - weeks = floor(duration / 7)
   - remaining = duration % 7
   - price = (weeks x weeklyRate) + (remaining x dailyRate)
5. If duration >= 30 and monthlyRate exists:
   - months = floor(duration / 30)
   - remaining = duration % 30
   - price = (months x monthlyRate) + (remaining x dailyRate)
6. Apply promo discount if valid
7. Total = calculatedPrice
8. Deposit = vehicle.depositAmount
```

---

## Payment Flow

### Payment Creation (via Xendit)

```
Customer        Backend          Xendit           Database
   |               |               |                |
   |-- Select      |               |                |
   |   payment --->|               |                |
   |   method      |               |                |
   |               |-- Create      |                |
   |               |   invoice --->|                |
   |               |               |                |
   |               |<-- Invoice    |                |
   |               |    URL -------|                |
   |               |                                |
   |               |-- Save payment record -------->|
   |               |   (status: PENDING)            |
   |               |                                |
   |<-- Payment    |                                |
   |    URL -------|                                |
   |               |                                |
   |-- Pay via     |                                |
   |   Xendit ---->|               |                |
   |   checkout    |               |                |
   |               |               |                |
```

### Payment Webhook (Xendit Callback)

```
Xendit           Backend                      Database
   |               |                             |
   |-- POST        |                             |
   |   /webhook -->|                             |
   |   (paid)      |-- Verify webhook sig ------>|
   |               |-- Update payment status --->|
   |               |   (status: PAID)            |
   |               |-- Update booking status --->|
   |               |   (status: ACTIVE)          |
   |               |-- Update vehicle status --->|
   |               |   (status: RENTED)          |
   |               |-- Send notification ------->|
   |               |   (to customer)             |
   |               |-- Create audit log -------->|
   |               |                             |
   |<-- 200 OK ----|                             |
```

### Payment Status Flow

```
PENDING ----> PAID (webhook confirms payment)
   |
   +--------> EXPIRED (payment window closes)
   |
   +--------> FAILED (payment attempt fails)

PAID -------> REFUNDED (admin initiates refund)
```

---

## Vehicle Checkpoint Flow

### Pickup Checkpoint

```
Driver/Admin               Backend                   Database/R2
   |                         |                          |
   |-- Start pickup check -->|                          |
   |                         |                          |
   |-- Upload photos:        |                          |
   |   - Front              |-- Upload to R2 --------->|
   |   - Back               |                          |
   |   - Left               |                          |
   |   - Right              |                          |
   |   - Interior           |                          |
   |   - Odometer           |                          |
   |                         |                          |
   |-- Enter odometer ------>|                          |
   |-- Enter fuel level ---->|                          |
   |-- Complete checklist -->|                          |
   |                         |                          |
   |-- Submit checkpoint --->|                          |
   |                         |-- Create checkpoint ---->|
   |                         |   (type: PICKUP)         |
   |                         |-- Update booking ------->|
   |                         |   (confirm active)       |
   |                         |                          |
   |<--- Checkpoint saved ---|                          |
```

### Return Checkpoint

```
Driver/Admin               Backend                   Database/R2
   |                         |                          |
   |-- Start return check -->|                          |
   |                         |                          |
   |-- Upload photos ------->|-- Upload to R2 --------->|
   |-- Enter odometer ------>|                          |
   |-- Enter fuel level ---->|                          |
   |-- Complete checklist -->|                          |
   |                         |                          |
   |-- Submit checkpoint --->|                          |
   |                         |-- Create checkpoint ---->|
   |                         |   (type: RETURN)         |
   |                         |-- Compare with pickup -->|
   |                         |   (odometer, fuel, etc.) |
   |                         |                          |
   |                         |-- Check for penalties:   |
   |                         |   - Late return?         |
   |                         |   - Damage?              |
   |                         |   - Fuel shortage?       |
   |                         |                          |
   |                         |-- If penalties exist:    |
   |                         |   Create penalty ------->|
   |                         |                          |
   |                         |-- Update vehicle:        |
   |                         |   - status: AVAILABLE -->|
   |                         |   - mileage: updated --->|
   |                         |                          |
   |                         |-- Complete booking ----->|
   |                         |   (status: COMPLETED)    |
   |                         |                          |
   |<--- Return completed ---|                          |
```

---

## Admin Approval Flow

### Booking Approval

```
Admin                      Backend                   Database
   |                         |                          |
   |-- GET /bookings ------->|                          |
   |   ?status=PENDING       |-- Query pending -------->|
   |                         |                          |
   |<--- Pending list -------|                          |
   |                         |                          |
   |-- Review booking:       |                          |
   |   - Check driver docs   |                          |
   |   - Check vehicle avail |                          |
   |   - Verify dates        |                          |
   |                         |                          |
   |-- PUT /bookings/:id     |                          |
   |   /approve ------------>|                          |
   |                         |-- Update status -------->|
   |                         |   (APPROVED)             |
   |                         |-- Set approvedBy ------->|
   |                         |-- Set approvedAt ------->|
   |                         |-- Send notification ---->|
   |                         |   (to customer)          |
   |                         |-- Create payment link -->|
   |                         |                          |
   |<--- Approved -----------|                          |
```

### Document Verification

```
Admin                      Backend                   Database
   |                         |                          |
   |-- GET /documents ------>|                          |
   |   ?status=PENDING       |-- Query pending docs --->|
   |                         |                          |
   |<--- Document list ------|                          |
   |                         |                          |
   |-- View document image ->|                          |
   |   (KTP/SIM/Selfie)     |                          |
   |                         |                          |
   |-- Approve/Reject ------>|                          |
   |                         |-- Update doc status ---->|
   |                         |-- Update verification -->|
   |                         |-- If all approved:       |
   |                         |   - Set user.isVerified  |
   |                         |   - Send notification    |
   |                         |                          |
   |<--- Updated ------------|                          |
```

---

## Maintenance Flow

### Scheduled Maintenance

```
System/Admin               Backend                   Database
   |                         |                          |
   |-- Check due dates ----->|                          |
   |   (cron job or manual)  |-- Query vehicles ------->|
   |                         |   WHERE next_maint <= now|
   |                         |                          |
   |<--- Due vehicles -------|                          |
   |                         |                          |
   |-- Create maintenance -->|                          |
   |   request               |-- Update vehicle ------->|
   |                         |   status: MAINTENANCE    |
   |                         |   isAvailable: false     |
   |                         |                          |
   |-- Perform work -------->|                          |
   |                         |                          |
   |-- Log completion ------>|                          |
   |                         |-- Create maint log ----->|
   |                         |-- Update vehicle ------->|
   |                         |   status: AVAILABLE      |
   |                         |   isAvailable: true      |
   |                         |   mileage: updated       |
   |                         |-- Set next_maint_at ---->|
   |                         |                          |
   |<--- Completed ----------|                          |
```

### Emergency Maintenance

```
Driver/Admin               Backend                   Database
   |                         |                          |
   |-- Report issue -------->|                          |
   |   (via support ticket)  |-- Create ticket -------->|
   |                         |   (priority: URGENT)     |
   |                         |                          |
   |-- Admin escalates ----->|                          |
   |                         |-- Pull vehicle from ---->|
   |                         |   active duty            |
   |                         |   status: MAINTENANCE    |
   |                         |                          |
   |                         |-- If booking active:     |
   |                         |   - Arrange replacement  |
   |                         |   - Notify customer      |
   |                         |                          |
   |-- Mechanic repairs ---->|                          |
   |                         |                          |
   |-- Log completion ------>|                          |
   |                         |-- Create maint log ----->|
   |                         |   (type: EMERGENCY)      |
   |                         |-- Update vehicle ------->|
   |                         |   status: AVAILABLE      |
   |                         |                          |
   |<--- Resolved -----------|                          |
```
