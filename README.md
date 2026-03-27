# Async Job Processor

A Node.js application for processing asynchronous jobs using BullMQ and Redis. This project demonstrates a scalable job queue system with retry mechanisms, background processing, and includes a visual dashboard for queue management.

## Features

- Asynchronous job processing with BullMQ
- Redis-based queue storage
- Automatic retry with exponential backoff
- RESTful API for job submission
- Background worker processing
- Email and report job examples
- Bull Board dashboard for queue visualization and management
- Docker and Docker Compose support
- Environment-based configuration

## Tech Stack

- **Node.js** (v20) - Runtime environment
- **Express.js** - Web framework
- **BullMQ** - Job queue library
- **Bull Board** - Queue management UI
- **Redis** - Queue storage and cache
- **IORedis** - Redis client
- **Docker** - Containerization

## Prerequisites

### Option 1: Local Development
- Node.js (v14 or higher)
- Redis server running on localhost:6379

### Option 2: Docker
- Docker
- Docker Compose

## Installation

### Option 1: Local Setup

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

### Option 2: Docker Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd async-job-processor
```

2. Build and start with Docker Compose:
```bash
docker-compose up --build
```

This will start:
- Redis on port 6379
- API Server on port 5000
- Background Worker service
- All services automatically connected

## Usage

### Starting the Application (Local)

1. Start the server:
```bash
node src/server.js
```

2. In a separate terminal, start the worker:
```bash
node src/workers/index.worker.js
```

The server will run on http://localhost:5000

### Starting with Docker

```bash
docker-compose up
```

All services will start automatically and be connected via the internal network.

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

#### Create Report Job
- **POST** `/jobs/report`
- **Body**: `{ "reportId": "report-123", "type": "monthly" }`
- **Response**: `{ "message": "Job added to queue" }`

Example request:
```bash
curl -X POST http://localhost:5000/jobs/report \
  -H "Content-Type: application/json" \
  -d '{"reportId": "report-123", "type": "monthly"}'
```

### Dashboard

#### Bull Board Queue Manager
Access the Bull Board dashboard to visualize and manage queues:

- **URL**: http://localhost:5000/admin/queues
- **Features**:
  - View all pending, processing, and completed jobs
  - Retry failed jobs
  - Remove jobs from queues
  - Monitor queue statistics
  - Real-time job status updates

## Architecture

```
┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   Client    │───▶│   Express API   │───▶│   BullMQ Queues  │
│             │    │   + Bull Board  │    │ (Email, Report)  │
└─────────────┘    └─────────────────┘    └──────────────────┘
                                                     │
                                                     ▼
                                          ┌──────────────────┐
                                          │     Redis DB     │
                                          └──────────────────┘
                                                     │
                                                     ▼
                                          ┌──────────────────┐
                                          │  Worker Process  │
                                          │  (Background)    │
                                          └──────────────────┘
                                                     │
                                  ┌──────────────────┴──────────────────┐
                                  ▼                                     ▼
                                ┌──────────────┐                 ┌──────────────┐
                                │Email Service │                 │Report Service│
                                └──────────────┘                 └──────────────┘
```

### Docker Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Redis      │    │   API Server │    │   Worker     │  │
│  │   Service    │────│   Service    │────│   Service    │  │
│  │ (port 6379)  │    │ (port 5000)  │    │ (background) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         ▲                                        │           │
│         │                                        ▼           │
│         └────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### Components

- **Server** (`src/server.js`): Starts the Express server with Bull Board integration
- **App** (`src/app.js`): Express application setup with routes and middleware
- **Routes** (`src/routes/job.routes.js`): API route definitions for job submission
- **Controller** (`src/controllers/job.controller.js`): Request handlers for creating jobs
- **Bull Board** (`src/config/bullBoard.js`): Queue visualization dashboard configuration
- **Jobs** (`src/jobs/`): Job creation logic for different job types
- **Queue** (`src/config/queue.js`): BullMQ queue configuration for email and report queues
- **Redis** (`src/config/redis.js`): Redis connection setup
- **Workers** (`src/workers/`): Background job processors for handling job execution
- **Services** (`src/services/`): Business logic layer (email sending, report generation, etc.)

## Job Processing Flow

1. Client sends POST request to `/jobs/email` or `/jobs/report` with job data
2. Controller validates request and adds job to BullMQ queue
3. Job is stored in Redis
4. Worker picks up job from queue and processes it in the background
5. Service layer handles the actual business logic (email sending, report generation, etc.)
6. Job completion/failure is logged and stored
7. Results can be viewed in Bull Board dashboard

## Environment Variables

You can configure the application using environment variables:

```env
# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Server Configuration
PORT=5000

# Bull Board Configuration
BULL_BOARD_PATH=/admin/queues
```

### Docker Environment

In `docker-compose.yml`, environment variables are set for each service:
- `REDIS_HOST=redis` (uses the Redis service name for internal networking)
- `REDIS_PORT=6379`

## Development

### Local Development with Auto-Restart

Install nodemon globally or locally:
```bash
npm install -g nodemon
```

Start the server with auto-restart:
```bash
nodemon src/server.js
```

Start the worker with auto-restart:
```bash
nodemon src/workers/index.worker.js
```

### Debugging

For better debugging output, you can set the DEBUG environment variable:
```bash
DEBUG=* node src/server.js
```

## Docker Compose Commands

### Build and Start Services
```bash
docker-compose up --build
```

### Start Services (without rebuild)
```bash
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f app
docker-compose logs -f worker
docker-compose logs -f redis
```

### Remove All Data (including Redis data)
```bash
docker-compose down -v
```

## Troubleshooting

### Redis Connection Issues
- Ensure Redis is running on the correct host and port
- Default: `localhost:6379` (local) or `redis:6379` (Docker)
- Check Redis status:
```bash
redis-cli ping
```

### Jobs Not Processing
- Ensure the worker service is running
- Check worker logs for errors
- Verify Redis connection and data
- Check if job queue is not stuck with failed jobs

### Bull Board Not Accessible
- Ensure the API server is running
- Access via http://localhost:5000/admin/queues
- Check server logs for errors

### Port Already in Use
- Change the port in `src/server.js` or environment variables
- Or stop the service using the port:
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Performance Considerations

- **Job Retry**: Default configured with exponential backoff (3 attempts, 2s initial delay)
- **Worker Concurrency**: Can be increased based on system resources
- **Redis Memory**: Monitor Redis memory usage, especially with high volume of jobs
- **Database Connections**: Scale workers independently from API server

## License

ISC