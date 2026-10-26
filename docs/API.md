# CyberArena API Documentation

Base URL:

```text
http://localhost:5000/api
```

CyberArena uses REST APIs between the React frontend and Express backend.

## Authentication

Protected routes require a JSON Web Token.

The token is sent using:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## Authentication API

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Player Name",
  "email": "player@example.com",
  "password": "123456"
}
```

Creates a new CyberArena player account.

---

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "player@example.com",
  "password": "123456"
}
```

Returns authenticated user information and a JWT.

---

### Get Current User

```http
GET /api/auth/me
```

Authentication:

```text
Required
```

Returns the current authenticated user's profile information and ticket statistics.

---

# Tournament API

### Get All Tournaments

```http
GET /api/tournaments
```

Authentication:

```text
Not required
```

Returns all available tournament records.

Tournament information includes:

- title
- game
- description
- date
- price
- total seats
- available seats

---

# Ticket API

### Reserve Tournament Ticket

```http
POST /api/tickets/reserve/:tournamentId
```

Authentication:

```text
PLAYER login required
```

Creates a ticket reservation and decreases the tournament's available seat count.

The API prevents duplicate active reservations for the same tournament.

---

### Get My Tickets

```http
GET /api/tickets/my
```

Authentication:

```text
Required
```

Returns tickets belonging to the logged-in user.

Ticket statuses are:

```text
RESERVED
CANCELLED
```

---

### Cancel Ticket

```http
PATCH /api/tickets/cancel/:ticketId
```

Authentication:

```text
Required
```

Cancels a ticket belonging to the authenticated user and restores one tournament seat.

---

# Leaderboard API

### Get Leaderboard

```http
GET /api/leaderboard
```

Authentication:

```text
Not required
```

Returns player ranking information.

Leaderboard data includes:

- rank
- name
- player ID
- points
- wins

Players are ranked primarily using points.

---

# Support API

### Submit Support Message

```http
POST /api/support
```

Authentication:

```text
Not required
```

Request example:

```json
{
  "name": "Player Name",
  "email": "player@example.com",
  "message": "I need help with my tournament ticket."
}
```

New support requests are created with:

```text
OPEN
```

status.

---

# Admin API

All Admin APIs require:

```text
Valid JWT
+
role = ADMIN
```

A normal PLAYER receives a forbidden response when attempting to access Admin APIs.

---

### Check Admin Access

```http
GET /api/admin/check
```

Used to verify ADMIN authorization.

---

### Create Tournament

```http
POST /api/admin/tournaments
```

Request example:

```json
{
  "title": "CyberArena Masters",
  "game": "Counter-Strike 2",
  "description": "Competitive CyberArena championship.",
  "date": "2026-12-15",
  "price": 2000,
  "totalSeats": 120
}
```

---

### Update Tournament

```http
PATCH /api/admin/tournaments/:id
```

Allows administrators to update tournament information.

The system protects seats that have already been reserved when tournament capacity is edited.

---

### Delete Tournament

```http
DELETE /api/admin/tournaments/:id
```

A tournament cannot be deleted when ticket records already exist for that tournament.

This protects reservation history.

---

# Admin Support API

### Get Support Messages

```http
GET /api/admin/support
```

Returns all player support messages.

Authentication:

```text
ADMIN only
```

---

### Update Support Message Status

```http
PATCH /api/admin/support/:id/status
```

Request:

```json
{
  "status": "RESOLVED"
}
```

or:

```json
{
  "status": "OPEN"
}
```

Supported values are:

```text
OPEN
RESOLVED
```

---

# Common HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource successfully created |
| 400 | Invalid request |
| 401 | Authentication required or token invalid |
| 403 | User does not have required permission |
| 404 | Resource or API route not found |
| 500 | Internal server error |

---

# Authorization Summary

| Function | Public | Player | Admin |
|---|---:|---:|---:|
| View tournaments | ✅ | ✅ | ✅ |
| View leaderboard | ✅ | ✅ | ✅ |
| Submit support request | ✅ | ✅ | ✅ |
| Reserve ticket | ❌ | ✅ | ✅ |
| View own tickets | ❌ | ✅ | ✅ |
| Cancel own ticket | ❌ | ✅ | ✅ |
| View profile | ❌ | ✅ | ✅ |
| Create tournament | ❌ | ❌ | ✅ |
| Edit tournament | ❌ | ❌ | ✅ |
| Delete tournament | ❌ | ❌ | ✅ |
| View support inbox | ❌ | ❌ | ✅ |
| Resolve support request | ❌ | ❌ | ✅ |