# Node.js Express TypeScript Boilerplate

> Production-ready Node.js + TypeScript + Express + MongoDB boilerplate with enterprise-grade security and architecture.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.8-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Features

- ✅ **RESTful API** - Clean Express.js architecture with TypeScript
- ✅ **MongoDB Integration** - Generic repository pattern
- ✅ **Security First** - Helmet, CORS, compression
- ✅ **Auto-Generated Swagger Docs** - Interactive API documentation
- ✅ **Auto-Linting** - Standard linter with auto-fix on save
- ✅ **Production Ready** - Optimized dependencies and build process
- ✅ **Modular Architecture** - Easy to add new modules

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Architecture](#architecture)

## 🏁 Quick Start

### Prerequisites

- Node.js 20+ 
- MongoDB 6.8+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd node-express-ts-boilerplate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start MongoDB (if not running)
mongod

# Start development server
npm run dev
```

Server will start on `http://localhost:7777`

### Access Swagger Documentation

Visit: **`http://localhost:7777/api-docs`**

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Users
| Endpoint | Method | Feature Flag | Description |
|----------|--------|--------------|-------------|
| `users` | GET | `users.list` | List all users |

## 🎛️ Feature Flags

Control features dynamically via `.env`:

```json
{
  "modules": {
    "users": true
  },
  "features": {
    "users": {
      "list": true
    }
  }
}
```

## 🔒 Security

### Implemented Security Features

- **Helmet** - Secure HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Compression** - Gzip compression for responses

### Configuration (`.env`)

```bash
CORS_ORIGINS=*  # Production: https://yourdomain.com
COMPRESSION_LEVEL=6
COMPRESSION_THRESHOLD=1024
```

## 📝 Logging

The service uses **Pino** for high-performance structured logging.

- **Header Masking**: Sensitive headers (`Authorization`, `Cookie`, etc.) are automatically redacted.
- **Correlation IDs**: Requests are tracked via `x-correlation-id` header or auto-generated UUIDs.
- **Health Checks**: `/health` and `/favicon.ico` logs are suppressed.

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run swagger-gen  # Generate Swagger documentation
```

### Project Structure

```
src/
├── app.ts                 # Express app setup
├── server.ts              # Server entry point
├── config/                # Configuration
│   ├── env.ts            # Environment variables
│   └── features.ts       # Feature flags
├── db/                    # Database
│   ├── mongoClient.ts    # MongoDB connection
│   ├── mongo.repository.ts # Generic repository
│   └── base.repository.ts
├── middleware/            # Express middleware
│   ├── errorHandler.ts
│   ├── featureFlag.ts    # Feature flag middleware
│   ├── requestLogger.ts
│   └── validate.ts
├── modules/               # Feature modules
│   └── users/
└── lib/                   # Utilities
```

## 🚢 Production Deployment

### Build

```bash
npm run build
```

### Environment Variables

Update `.env` for production:

```bash
NODE_ENV=production
PORT=7777
MONGO_URI=mongodb://production-server:27017
MONGO_DB_NAME=production_db
SERVICE_ID=my-service
CORS_ORIGINS=https://yourdomain.com
```

### Start Production Server

```bash
npm start
```

## 🏗️ Architecture

### Design Patterns

- **Generic Repository Pattern** - Reusable MongoDB operations
- **Middleware Pattern** - Composable request processing
- **Modular Monolith** - Feature-based folder structure

### Key Technologies

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.6
- **Framework**: Express 4.21
- **Database**: MongoDB 6.8
- **Validation**: Zod
- **Linting**: ESLint with neostandard

## 📄 License

MIT
# simple-express-node-TS-for-microservices-small
