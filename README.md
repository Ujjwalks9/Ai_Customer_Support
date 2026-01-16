

# AI-Powered Customer Support System

**Full-Stack Engineering**

This repository contains a **full-stack AI-powered customer support system** built as part of a **Junior Engineer (Full Stack) assessment**.
The project focuses on **clean backend architecture**, **multi-agent orchestration**, **database-backed tools**, and **AI-assisted responses**, with the entire system **fully containerized using Docker Compose**.

---

##  Project Overview

The system allows users to interact with a customer-support chat interface.
Incoming messages are routed to **specialized agents** based on intent, each responsible for handling a specific domain:

* **Support Agent** → General assistance (AI-powered)
* **Order Agent** → Order-related queries (database-backed)
* **Billing Agent** → Invoice & refund queries (database-backed)

Conversation context is persisted so agents can respond with awareness of prior messages.

---

##  Architecture Overview

### High-Level System Architecture

```mermaid
graph TD
    subgraph Client["Client Layer"]
        UI[React Vite Chat UI]
    end

    subgraph Server["Backend Layer"]
        API[Hono REST API]
        Controller[Chat Controller]
        Service[Chat Service]
        Router[Router Agent]
    end

    subgraph Agents["Agent Layer"]
        Support[Support Agent - AI]
        Order[Order Agent]
        Billing[Billing Agent]
    end

    subgraph Infra["Infrastructure"]
        DB[(PostgreSQL)]
        Groq[Groq LLM]
    end

    UI --> API
    API --> Controller
    Controller --> Service
    Service --> Router

    Router --> Support
    Router --> Order
    Router --> Billing

    Support --> Groq
    Support --> DB
    Order --> DB
    Billing --> DB

```

---

##  Backend Request Flow

```
User Message
   ↓
POST /api/chat/messages
   ↓
Chat Controller
   ↓
Chat Service
   ↓
Router Agent (intent detection)
   ↓
Domain Agent
   ├── Support Agent → AI (Groq)
   ├── Order Agent → Orders table
   └── Billing Agent → Invoices table
   ↓
Persist Messages (PostgreSQL)
   ↓
Response to Client
```

---

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React, Vite, TypeScript |
| Backend  | Node.js, Hono           |
| AI       | Vercel AI SDK, Groq     |
| Database | PostgreSQL              |
| ORM      | Prisma                  |
| DevOps   | Docker, Docker Compose  |

---

##  Project Structure

```
ai-support-system/
├── docker-compose.yml
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── agents/
│   │   │   ├── tools/
│   │   │   └── db/
│   │   ├── prisma/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       ├── Dockerfile
│       └── package.json
```

---

##  AI Integration

* The **Support Agent** uses the **Vercel AI SDK** with **Groq** for generating responses.
* AI responses are **streamed** to the client for a better user experience.
* Conversation history is used as context for AI responses.
* Order and Billing agents intentionally remain **deterministic and database-driven**.

---

##  Running the Project (Docker)

### Prerequisites

* Docker
* Docker Compose

### Run everything with one command

```bash
docker compose up --build
```

### Access the application

| Service      | URL                                                          |
| ------------ | ------------------------------------------------------------ |
| Frontend     | [http://localhost:5173](http://localhost:5173)               |
| Backend      | [http://localhost:3000](http://localhost:3000)               |
| Health Check | [http://localhost:3000/health](http://localhost:3000/health) |

---

##  Environment Variables

Create a `.env` file in `apps/backend/`:

```env
DATABASE_URL=postgresql://admin:admin@postgres:5432/ai_support
GROQ_API_KEY=your_groq_api_key_here
```

---

##  API Endpoints

### Chat

```
POST /api/chat/messages
```

```json
{
  "message": "What is my order status?",
  "conversationId": "conv-101"
}
```

### Conversations

```
GET    /api/conversations
GET    /api/conversations/:id
DELETE /api/conversations/:id
```

---

##  Design Principles

* Clear separation of concerns
* Multi-agent architecture over monolithic logic
* Deterministic business logic where correctness matters
* AI used only where it adds value
* Docker-first developer experience


---

##  Author

**Ujjwal Kumar Singh**
Full-Stack Developer

---
