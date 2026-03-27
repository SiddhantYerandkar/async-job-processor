# Async Job Processor

A Node.js application for processing asynchronous jobs using BullMQ and Redis. This project demonstrates a scalable job queue system with retry mechanisms and background processing.

## Features

- Asynchronous job processing with BullMQ
- Redis-based queue storage
- Automatic retry with exponential backoff
- RESTful API for job submission
- Background worker processing
- Email job example implementation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **BullMQ** - Job queue library
- **Redis** - Queue storage
- **IORedis** - Redis client

## Prerequisites

- Node.js (v14 or higher)
- Redis server running on localhost:6379

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd async-job-processor
```

2. Install dependencies:
```bash
npm install
```

3. Start Redis server (if not already running):
```bash
redis-server
```

## Usage

### Starting the Application

1. Start the server:
```bash
node src/server.js
```

2. In a separate terminal, start the worker:
```bash
node src/workers/email.worker.js
```

The server will run on http://localhost:5000

### API Endpoints

#### Create Email Job
- **POST** `/jobs/email`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: `{ "message": "Job added to queue" }`

Example request:
```bash
curl -X POST http://localhost:5000/jobs/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│   Express   │───▶│   BullMQ    │
│             │    │   Server    │    │   Queue     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                   ┌─────────────┐
                                   │   Worker    │
                                   │  Processor  │
                                   └─────────────┘
                                              │
                                              ▼
                                   ┌─────────────┐
                                   │   Service   │
                                   │   (Email)   │
                                   └─────────────┘
```

### Components

- **Server** (`src/server.js`): Starts the Express server
- **App** (`src/app.js`): Express application setup with routes
- **Routes** (`src/routes/job.routes.js`): API route definitions
- **Controller** (`src/controllers/job.controller.js`): Request handlers
- **Jobs** (`src/jobs/email.job.js`): Job creation logic
- **Queue** (`src/config/queue.js`): BullMQ queue configuration
- **Redis** (`src/config/redis.js`): Redis connection setup
- **Worker** (`src/workers/email.worker.js`): Background job processor
- **Service** (`src/services/email.service.js`): Business logic (email sending)

## Job Processing Flow

1. Client sends POST request to `/jobs/email` with email data
2. Controller validates request and adds job to BullMQ queue
3. Worker picks up job from queue and processes it
4. Service layer handles the actual email sending logic
5. Job status is logged (completed/failed)

## Configuration

The application uses the following default configurations:

- **Server Port**: 5000
- **Redis Host**: 127.0.0.1
- **Redis Port**: 6379
- **Job Retries**: 3 attempts with exponential backoff (2s delay)

## Development

For development with auto-restart:
```bash
npm install -g nodemon
nodemon src/server.js
```

## License

ISC