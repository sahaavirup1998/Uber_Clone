# Uber Clone Backend

## Overview
This is the backend for an Uber-like ride-hailing application. It is built using Node.js, Express, and MongoDB (Mongoose). The backend provides RESTful APIs for user and captain (driver) registration, authentication, profile management, and vehicle details.

## Project Structure
```
Backend/
├── app.js                # Main Express app setup
├── server.js             # Server entry point
├── package.json          # Project dependencies
├── controllers/          # Route controllers
│   ├── captain.controller.js
│   └── user.controller.js
├── db/
│   └── db.js             # MongoDB connection
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── blacklistToken.model.js
│   ├── captain.model.js
│   └── user.model.js
├── routes/
│   ├── captain.routes.js
│   └── user.routes.js
├── services/
│   ├── captain.services.js
[// -----------------------------------------------------------------------------]

│   └── user.services.js
```

## Full API Details

### User APIs

#### Register User
- **Method:** POST
- **Path:** `/users/register`
- **Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... }
  }
  ```
- **Description:** Registers a new user. Validates input, hashes password, returns JWT and user data.

#### Login User
- **Method:** POST
- **Path:** `/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... }
  }
  ```
- **Description:** Authenticates user, returns JWT and user data.

#### Get User Profile
- **Method:** GET
- **Path:** `/users/profile`
- **Headers:** `Authorization: Bearer <jwt_token>` or cookie
- **Response:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    ...other fields
  }
  ```
- **Description:** Returns authenticated user's profile.

#### Logout User
- **Method:** POST
- **Path:** `/users/logout`
- **Headers:** Auth required
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Description:** Blacklists JWT, clears cookie.

### Captain APIs

#### Register Captain
- **Method:** POST
- **Path:** `/captains/register`
- **Body:**
  ```json
  {
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": { ... }
  }
  ```
- **Description:** Registers a new captain (driver) with vehicle details.

#### Login Captain
- **Method:** POST
- **Path:** `/captains/login`
- **Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": { ... }
  }
  ```
- **Description:** Authenticates captain, returns JWT and captain data.

#### Get Captain Profile
- **Method:** GET
- **Path:** `/captains/profile`
- **Headers:** Auth required
- **Response:**
  ```json
  {
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "vehicle": { ... },
    ...other fields
  }
  ```
- **Description:** Returns authenticated captain's profile.

#### Logout Captain
- **Method:** POST
- **Path:** `/captains/logout`
- **Headers:** Auth required
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Description:** Blacklists JWT, clears cookie.

## Model Files Details

### User Model (`models/user.model.js`)
```js
{
  fullname: {
    firstname: String, // required, min 3 chars
    lastname: String   // min 3 chars
  },
  email: String,       // required, unique, min 5 chars
  password: String,    // required, hashed, select: false
  socketId: String
}
```
- **Methods:**
  - `generateAuthToken()`: Returns JWT for user
  - `comparePassword(password)`: Compares password using bcrypt
  - `hashPassword(password)`: Hashes password

### Captain Model (`models/captain.model.js`)
```js
{
  fullname: {
    firstname: String, // required, min 3 chars
    lastname: String   // min 3 chars
  },
  email: String,       // required, unique, valid email
  password: String,    // required, hashed, select: false
  socketId: String,
  status: String,      // 'active' or 'inactive', default: 'inactive'
  vehicle: {
    color: String,     // required, min 3 chars
    plate: String,     // required, min 3 chars
    capacity: Number,  // required, min 1
    vehicleType: String // required, enum: ['car', 'motorcycle', 'auto']
  },
  location: {
    ltd: Number,
    lng: Number
  }
}
```
- **Methods:**
  - `generateAuthToken()`: Returns JWT for captain
  - `comparePassword(password)`: Compares password using bcrypt
  - `hashPassword(password)`: Hashes password

### BlacklistToken Model (`models/blacklistToken.model.js`)
```js
{
  token: String,    // required, unique
  createdAt: Date   // default: now, expires: 24h
}
```
- **Purpose:** Stores JWTs that have been invalidated (logout)

