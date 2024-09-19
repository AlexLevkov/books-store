# Bookstore Inventory Manager

#### A full-stack web application for managing a collection of books, built with React, Node.js, TypeScript, PostgreSQL, and Docker.

## 📋 Table of Contents

1. [Usage](#-usage)
2. [Installation](#-installation)
3. [Tech Stack](#-tech-stack)
4. [Assumptions](#-assumptions)
5. [Architecture](#-architecture)

## 🛠️ Usage

This app allows users to **search**, **add**, **edit**, and **delete** books from an inventory, ensuring a user-friendly and responsive experience across all devices.

## ⚙️ Installation

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AlexLevkov/books-store.git
   cd books-store
   ```
2. **Build and Run with Docker Compose:**
   - **Note:** The Docker team recommends using `compose.yaml` instead of `docker-compose.yml` for better compatibility and future-proofing.
   ```bash
   docker-compose up --build
   ```
3. **Access the Application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:2000](http://localhost:2000)
   - **PostgreSQL Database:** Accessible on port `5432`

## 📚 Tech Stack

- **Frontend:**

  - React
  - Vite
  - TypeScript

- **Backend:**

  - Node.js
  - Express
  - TypeScript
  - PostgreSQL

- **DevOps:**

  - Docker
  - Docker Compose

## 🖥️ Architecture

<img src="https://raw.githubusercontent.com/AlexLevkov/books-store/main/client/public/diagram.png" alt="Architecture Diagram" width="600"/>

## 💡 Assumptions

- **Initial Data Population:** The application is designed to initialize with a predefined set of data.

  ```yaml
  ./server/init.sql:/docker-entrypoint-initdb.d/init.sql
  ```

- **Database Schema:** The core database schema is defined as follows:

  ```sql
  CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL
  );
  ```

- **Data Persistence:** To prevent data loss in case of a Docker container crash, a volume has been set up to persist database data:

  ```yaml
  postgres_data:/var/lib/postgresql/data
  ```

- **Accessibility:** The application is built with accessibility in mind, allowing full control via the keyboard.

- **Multi-Device Compatibility:** While the application is primarily intended for desktop use, multi-device compatibility has been considered.

- **Validation and Error Handling:** Users may make mistakes and unexpected glitches can occur, robust validation and error handling have been prioritized.
