# Kumaran E-Services Backend API

Professional billing system backend with JWT authentication and bcrypt password encryption.

## 🚀 Features

- ✅ **Secure Authentication** - JWT tokens with bcrypt password hashing
- ✅ **Employee Management** - Auto-generated employee IDs (EMP0001, EMP0002, etc.)
- ✅ **Dual Login** - Login with email OR employee ID
- ✅ **Role-Based Access** - Staff, Manager, Admin roles
- ✅ **Phone Validation** - 10-digit phone number validation
- ✅ **Protected Routes** - Middleware for authentication
- ✅ **MongoDB Integration** - Mongoose ODM with validation

## 📁 Project Structure

```
backend/
├── controller/
│   └── authController.js      # Authentication logic
├── database/
│   └── db.js                   # MongoDB connection
├── middleware/
│   └── auth.js                 # JWT verification & authorization
├── models/
│   └── user.js                 # User schema with encryption
├── routes/
│   └── authRoutes.js           # API routes
├── .env                        # Environment variables
├── server.js                   # Main server file
└── package.json
```

## 🛠️ Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Update `.env` file with your settings:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kumaran-eservices
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

3. **Make sure MongoDB is running:**
   ```bash
   # Start MongoDB service
   mongod
   ```

## 🏃 Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on: `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

#### 1. Register Employee

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

**Response:**

```json
{
  "success": true,
  "message": "Employee registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "employeeId": "EMP0001",
    "phone": "1234567890",
    "role": "staff"
  }
}
```

#### 2. Login (Email or Employee ID)

```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "john@example.com",  // or "EMP0001"
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "employeeId": "EMP0001",
    "phone": "1234567890",
    "role": "staff",
    "lastLogin": "2024-12-03T14:20:00.000Z"
  }
}
```

#### 3. Get Current User (Protected)

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### 4. Update Password (Protected)

```http
PUT /api/auth/updatepassword
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### 5. Health Check

```http
GET /api/health
```

## 🔐 Security Features

### Password Encryption

- **Algorithm:** bcrypt with salt rounds = 10
- **Auto-hashing:** Passwords are automatically hashed before saving
- **Secure comparison:** Uses bcrypt.compare() for verification

### JWT Authentication

- **Token expiry:** 7 days (configurable)
- **Secure secret:** Stored in environment variables
- **Protected routes:** Middleware verifies token on protected endpoints

### Data Validation

- Email format validation
- 10-digit phone number validation
- Password minimum length: 6 characters
- Required field validation

## 👥 User Roles

- **staff** - Default role for employees
- **manager** - Elevated permissions
- **admin** - Full system access

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  employeeId: String (auto-generated, unique, uppercase),
  phone: String (required, 10 digits),
  password: String (required, min 6 chars, encrypted),
  role: String (enum: staff/manager/admin),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing with Postman/Thunder Client

1. **Register a new employee**
2. **Copy the token from response**
3. **Use token in Authorization header:** `Bearer <token>`
4. **Test protected routes**

## 🐛 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 📝 Environment Variables

| Variable    | Description               | Example                                     |
| ----------- | ------------------------- | ------------------------------------------- |
| PORT        | Server port               | 5000                                        |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/kumaran-eservices |
| JWT_SECRET  | Secret key for JWT        | your-secret-key                             |
| JWT_EXPIRE  | Token expiration time     | 7d                                          |
| NODE_ENV    | Environment mode          | development/production                      |

## 🚨 Important Notes

1. **Change JWT_SECRET** in production to a strong random string
2. **Enable MongoDB authentication** in production
3. **Use HTTPS** in production
4. **Set proper CORS origins** for production frontend URL
5. **Keep .env file secure** - never commit to version control

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for Kumaran E-Services**
