# MeetX - Activity Booking Application

MeetX is a RESTful API application that allows users to browse activities, register accounts, and book activities.

## Features

- User authentication (register, login, profile)
- Activity listing and details
- Activity booking system
- User booking management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/meetx.git
   cd meetx
   ```

2. Install backend dependencies
   ```
   cd meetx-backend
   npm install
   ```

3. Create a `.env` file in the meetx-backend directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the development server
   ```
   npm run dev
   ```

### Hosted API

The API is also available at the following hosted URL:
[https://meet-x-three.vercel.app/](https://meet-x-three.vercel.app/)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Authenticate user & get token | Public |
| GET | `/api/auth/me` | Get current user profile | Private |

### Activities

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/activities` | Get all activities | Public |
| GET | `/api/activities/:id` | Get single activity by ID | Public |
| POST | `/api/activities` | Create a new activity | Private |

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Book an activity | Private |
| GET | `/api/bookings/me` | Get all bookings for current user | Private |

## Postman Collection

You can import the complete API collection into Postman using this link:
[MeetX API Postman Collection](https://drive.google.com/file/d/16ZQtDI2w6-xcl5IoCj9ypPQaYm7bp3NU/view?usp=sharing)

## Request & Response Examples

### Register a User

**Request**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

### Login a User

**Request**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

### Get Activities

**Request**
```http
GET /api/activities
```

**Response**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "activity_id_1",
      "title": "Hiking Trip",
      "description": "A fun hiking trip in the mountains",
      "location": "Mountain Range",
      "dateTime": "2023-12-15T10:00:00.000Z"
    },
    {
      "_id": "activity_id_2",
      "title": "Beach Volleyball",
      "description": "Beach volleyball tournament",
      "location": "City Beach",
      "dateTime": "2023-12-20T14:00:00.000Z"
    }
  ]
}
```

### Book an Activity

**Request**
```http
POST /api/bookings
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "activityId": "activity_id_1"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "_id": "booking_id",
    "activity": "activity_id_1",
    "user": "user_id",
    "bookedAt": "2023-12-10T08:30:00.000Z"
  }
}
```