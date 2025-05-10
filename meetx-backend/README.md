# MeetX Backend - Activity Booking API

A RESTful API for a basic activity booking application built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication with JWT
- Activity listing and details
- Activity booking
- User booking management

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd meetx-backend
```

2. Install dependencies
```
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/meetx
JWT_SECRET=yoursecretkey
JWT_EXPIRE=30d
```

4. Start the server
```
# Development mode
npm run dev

# Production mode
npm start
```

The API should now be running at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get single activity
- `POST /api/activities` - Create new activity (protected)

### Bookings
- `POST /api/bookings` - Book an activity (protected)
- `GET /api/bookings/me` - Get current user's bookings (protected)

## API Testing

A Postman collection is included in the `/postman` directory. Import it into Postman to test the API endpoints.

## Data Models

### User
- `name` - User's full name
- `email` - User's email (unique)
- `phone` - User's phone number
- `password` - User's hashed password

### Activity
- `title` - Activity title
- `description` - Activity description
- `location` - Activity location
- `dateTime` - Date and time of the activity

### Booking
- `activity` - Reference to the booked activity
- `user` - Reference to the user who booked
- `bookedAt` - Timestamp of when the booking was made 