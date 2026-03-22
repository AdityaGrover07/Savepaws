# Distributed Location-Based Adoption Marketplace

A scalable, full-stack B2C platform built with a Node.js REST API backend, React frontend, real-time bidirectional communication via Socket.io, geospatial search using MongoDB, and cloud file storage on AWS S3. Designed with production SaaS architecture patterns — JWT-based auth, role-scoped authorization, and email notification workflows.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        React Frontend                        │
│              (Component-based UI, Role-scoped views)         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / WebSocket
┌────────────────────────────▼────────────────────────────────┐
│                    Node.js REST API                          │
│         Express · JWT Auth · Role-based Authorization        │
├──────────────┬──────────────────┬──────────────────────────┤
│  Geospatial  │   Real-time Chat  │    Email Notifications   │
│  Search API  │    (Socket.io)    │      (Nodemailer)        │
└──────┬───────┴────────┬─────────┴──────────────────────────┘
       │                │
┌──────▼──────┐  ┌──────▼──────┐  ┌──────────────────────────┐
│   MongoDB   │  │  Socket.io  │  │        AWS S3             │
│  (Mongoose) │  │   Rooms     │  │   (Media file storage)    │
│  Geospatial │  └─────────────┘  └──────────────────────────┘
│   Indexes   │
└─────────────┘
```

---

## Key Technical Features

### Geospatial Search
- MongoDB `2dsphere` index on listing coordinates for fast location-based queries
- Supports radius-based filtering — find listings within N km of a given lat/lng
- Compound indexes on `[location, type, status]` for combined filter performance

### Real-Time Messaging
- Persistent Socket.io rooms scoped per listing conversation
- Event-driven architecture: connection lifecycle, message delivery, and disconnect handling all managed server-side
- Message history persisted to MongoDB for session recovery

### Authentication & Authorization
- Stateless JWT authentication with token expiry and refresh flow
- Role-scoped authorization middleware — separate permission sets for listers, adopters, and admins
- Passwords hashed with bcrypt; tokens signed with HS256

### Cloud File Storage
- Multi-file upload via Multer → direct stream to AWS S3
- Presigned URL pattern for secure, time-limited media access
- Bucket policy enforces private-by-default with per-request access grants

### Email Notification System
- Transactional email via Nodemailer for listing events (new enquiry, adoption confirmed, status updates)
- Template-based email rendering with dynamic content injection

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Real-time | Socket.io |
| Auth | JWT (JSON Web Tokens), bcrypt |
| File Storage | AWS S3, Multer |
| Email | Nodemailer |
| Testing | Jest |
| Fonts | Google Fonts (Cinzel, Cormorant) |

---

## Project Structure

```
savepaws/
├── backend/
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # JWT auth, role guards, error handlers
│   ├── models/             # Mongoose schemas (User, Listing, Message)
│   ├── routes/             # Express route definitions
│   ├── services/           # S3 upload, email, socket handlers
│   ├── utils/              # Token helpers, validators
│   └── server.js           # Entry point, socket init
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── context/        # Auth context, socket context
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # API client, helpers
│   └── public/
├── .gitignore
└── README.md
```

---

## API Reference

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/logout` | Invalidate session |

### Listings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings?lat=&lng=&radius=` | Geospatial search by location |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/api/listings` | Create listing (auth required) |
| PUT | `/api/listings/:id` | Update listing (owner only) |
| DELETE | `/api/listings/:id` | Delete listing (owner only) |

### Messaging

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:listingId` | Fetch message history |
| POST | `/api/messages` | Send message (also emits via socket) |

### Media

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload files to S3, returns URLs |

---

## Database Schema

### Listing
```js
{
  title: String,
  description: String,
  type: { type: String, enum: ['dog', 'cat', 'cow', 'other'] },
  age: Number,                          // in months
  breed: String,
  gender: { type: String, enum: ['male', 'female', 'mixed'] },
  vaccinated: Boolean,
  sterilized: Boolean,
  health: { type: String, enum: ['healthy', 'minor_injury', 'serious_injury'] },
  photos: [String],                     // S3 URLs
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],              // [longitude, latitude]
    city: String,
    state: String
  },
  rescuer: { type: ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'adopted', 'pending'] },
  createdAt: Date
}
// Index: { location: '2dsphere' }
```

### User
```js
{
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['adopter', 'rescuer', 'admin'] },
  createdAt: Date
}
```

### Message
```js
{
  listing: { type: ObjectId, ref: 'Listing' },
  sender: { type: ObjectId, ref: 'User' },
  receiver: { type: ObjectId, ref: 'User' },
  content: String,
  readAt: Date,
  createdAt: Date
}
```

---

## Local Setup

### Prerequisites
- Node.js v16+
- MongoDB running locally or a MongoDB Atlas URI
- AWS account with an S3 bucket configured
- Gmail account (or SMTP credentials) for Nodemailer

### 1. Clone the repo

```bash
git clone https://github.com/AdityaGrover07/Savepaws.git
cd Savepaws
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
DB_URL=mongodb://localhost:27017/savepaws
AWS_KEY=your_aws_access_key
AWS_SECRET=your_aws_secret_key
AWS_S3_REGION=ap-south-1
AWS_S3_BUCKET=your_bucket_name
PAWS_EMAIL=your_email@gmail.com
PAWS_PASSWORD=your_app_password
JWT_SECRET=your_jwt_secret_min_32_chars
PORT=5000
```

Start the backend:

```bash
node server.js
# or with hot reload:
npx nodemon server.js
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm start
```

The app runs at `http://localhost:3000`, proxying API requests to `http://localhost:5000`.

---

## Running Tests

```bash
cd backend
npm test
```

Test coverage includes unit tests for auth middleware, JWT validation, and core service logic using Jest.

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `DB_URL` | MongoDB connection string |
| `AWS_KEY` | AWS IAM access key ID |
| `AWS_SECRET` | AWS IAM secret access key |
| `AWS_S3_REGION` | S3 bucket region (e.g. `ap-south-1`) |
| `AWS_S3_BUCKET` | S3 bucket name |
| `PAWS_EMAIL` | Sender email for Nodemailer |
| `PAWS_PASSWORD` | App password for sender email |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) |
| `PORT` | Server port (default: 5000) |

---

## Design Decisions

**Why MongoDB over PostgreSQL for listings?**
Geospatial queries using `$near` and `2dsphere` indexes are native to MongoDB and significantly simpler to implement and scale compared to PostGIS. For a location-first search use case, MongoDB was the right tradeoff.

**Why Socket.io over plain WebSockets?**
Socket.io adds room management, automatic reconnection, and event namespacing out of the box — all of which are needed for per-listing chat rooms without building reconnect logic manually.

**Why JWT over session-based auth?**
The platform is designed as a stateless REST API that can be horizontally scaled. Session-based auth requires sticky sessions or a shared session store — JWT keeps the backend stateless and simplifies scaling.

**Why S3 for media storage?**
Storing media on the application server creates a single point of failure and doesn't scale horizontally. S3 provides durable, globally available object storage with presigned URLs for secure, time-limited access without exposing bucket permissions.

---

## Dataset Reference

Pet attribute schema is modelled after the [PetFinder Adoption Prediction dataset](https://www.kaggle.com/competitions/petfinder-adoption-prediction/data).

| Field | Description |
|---|---|
| `type` | Animal type (dog, cat, cow, other) |
| `age` | Age in months at time of listing |
| `breed` | Primary breed |
| `vaccinated` | Vaccination status |
| `sterilized` | Spayed/neutered status |
| `health` | Health condition at listing |

---

*Built to demonstrate full-stack distributed system design patterns: geospatial data modeling, real-time event-driven communication, cloud-native file storage, and stateless JWT-based authentication.*
