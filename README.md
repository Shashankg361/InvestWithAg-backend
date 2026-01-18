# investWithAg

An AI-powered backend system that generates short, precise, and event-based feeds for stock portfolio holdings using live market data and news analysis.

This project focuses on **signal over noise**, ensuring users receive only meaningful updates related to their own stock holdings.

---

## 🚀 Overview

Retail investors often struggle to track relevant news and events impacting their portfolio due to information overload.  
**investWithAg** solves this by being **portfolio-aware** and **event-driven**, generating updates only when something important happens.

---

## 🧠 How It Works (Core Engine)

The system is built around a **cron-based trigger engine**:

### 1. Cron Scheduler
- Runs at defined intervals
- Acts as the core engine trigger
- Initiates portfolio analysis instead of relying on manual requests

### 2. Trigger / Rules Engine
For each user holding, the engine checks:
- Significant stock price movement (high / low / sudden changes)
- News sentiment (positive / negative)
- News type (earnings, regulatory, acquisition, etc.)

Feeds are generated **only if trigger conditions are met**.

### 3. Context-Aware Feed Generation
- The cron job fetches the **last generated feed from the database**
- This historical context is passed to the AI agent
- Prevents duplicate or repetitive updates
- Improves relevance and accuracy of new feeds

### 4. AI Processing
- Uses **LangChain** to orchestrate the workflow
- Uses an **LLM via Ollama** for local inference
- Produces **short, easy-to-read, actionable summaries**

### 5. Feed Storage
- Generated feeds are stored in **PostgreSQL**
- Used as:
  - User feed history
  - Context for future cron runs

---

## ✨ Key Features

- Portfolio-aware AI agent
- Event-driven feed generation
- Cron-based background processing
- Stateful feed intelligence using DB context
- Multi-user backend design
- Short, precise, and relevant updates

---

## 🛠 Tech Stack

- **Backend:** Nest.js
- **AI / Agent:** LangChain
- **LLM:** Ollama
- **Database:** PostgreSQL
- **Scheduling:** Cron jobs
- **APIs:** Third-party stock market & news APIs

---

## 📂 Project Status

🚧 **In Progress**

Currently focused on:
- Backend architecture
- Cron + trigger engine
- Feed intelligence & accuracy

Authentication and frontend integration will be added in future iterations.

---

## 🔮 Future Improvements

- User authentication (JWT / OAuth)
- User-configurable trigger rules
- Improved sentiment & event classification
- Feed prioritization & ranking
- Frontend / mobile client integration
- Notification delivery (email / WhatsApp / push)

---

## 📌 Disclaimer

This project is for learning and experimentation purposes and does not provide financial advice.
