# URL Shortener + Analytics Platform

A multi-tenant URL shortener built to go deep on core backend engineering concepts — not just CRUD. Each user can create short links, track clicks, and (in later phases) view real-time analytics.

This project was built incrementally, with a deliberate focus on understanding *why* each piece exists, not just making it work.

## Why this project

A URL shortener looks simple on the surface, but it's a small sandbox for problems that show up in almost every real backend system:

- Serving a hot path (redirects) as fast as possible
- Handling authentication and multi-tenant data isolation
- Doing non-critical work asynchronously so it doesn't block the user
- Turning raw events into useful aggregated insight
- Enforcing uniqueness safely under concurrency

## Tech stack

- **Node.js** + **Express** — API server
- **MongoDB** + **Mongoose** — data storage and schema modeling
- **JWT** — authentication
- **bcrypt** — password hashing
- **nanoid** — short code generation
- **Redis** *(planned)* — caching hot links
- **BullMQ** *(planned)* — async click tracking via job queue

## Features

### Implemented
- User registration and login (JWT-based auth)
- Password hashing with bcrypt
- Authenticated link creation (`POST /api/links`)
- Short code generation via `nanoid`
- Redirect endpoint (`GET /:code`) with click counting
- Multi-tenant data model — every link is tied to an owning user

### Planned
- Redis caching for the redirect hot path
- Async click tracking via a job queue (instead of a synchronous DB write per click)
- Aggregated analytics endpoints (clicks by country/device/time)
- Rate limiting on redirect and API endpoints
- Real-time analytics dashboard via WebSockets
- Tests (unit + integration)
- Dockerized deployment + CI

## Project structure

```
url-shortener/
├── app.js                  # Entry point
├── src/
│   ├── routes/              # Route definitions
│   ├── controllers/         # Route handler logic
│   ├── models/               # Mongoose schemas (User, Link)
│   ├── middleware/           # Auth middleware, etc.
│   ├── config/                 # DB connection setup
│   ├── workers/                 # Background job processors (planned)
│   └── utils/                    # Helpers
└── tests/
```

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
   JWT_SECRET=your-long-random-secret
   ```

3. Run in development mode (auto-restart on file changes):
   ```bash
   npm run dev
   ```

   Or run normally:
   ```bash
   npm start
   ```

## API

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user (`email`, `password`) |
| POST | `/api/auth/login` | Log in, returns a JWT |

### Links

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/links` | Yes | Create a short link (`originalUrl`) |
| GET | `/:code` | No | Redirect to the original URL, increments click count |

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Basic health check |

## Design notes

- **Codes are random (`nanoid`), not sequential** — avoids leaking information about link volume/order and sidesteps enumeration.
- **No deduplication on `originalUrl`** — every `POST /api/links` creates a new code, even for a URL shortened before. This keeps per-channel click tracking possible (e.g. different codes for Twitter vs. Instagram shares of the same link).
- **`code` and `owner` are indexed** — `code` because it's looked up on every redirect (the hottest path in the app), `owner` because "list my links" is a frequent per-user query.
- Click counting currently happens as a synchronous write on every redirect. This is a known, deliberate placeholder — it will move to an async queue in a later phase so it doesn't slow down the redirect itself.
