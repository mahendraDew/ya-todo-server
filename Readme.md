
# YA Todo App Server

Welcome to the **YA Todo App Server** repository. This project is the backend server for the YA Todo App, a simple and user-friendly task management system. It handles user authentication, task management, and provides API endpoints for interacting with the app's features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Auth Routes](#auth-routes)
  - [Todo Routes](#todo-routes)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure user signup and login with JWT.
- **CRUD Operations**: Create, Read, Update, and Delete (CRUD) operations for managing todo items.
- **RESTful API**: Well-documented RESTful API for easy integration with the frontend.
- **Secure Storage**: MongoDB for storing user and todo data.

## Tech Stack

- **Node.js** - JavaScript runtime environment.
- **Express** - Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB** - NoSQL database for storing user and todo data.
- **JWT** - JSON Web Tokens for secure user authentication.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**:

   ``` bash
   git clone https://github.com/your-username/ya-todo-app-server.git
   cd ya-todo-app-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
```

- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: Port on which the server will run (default: 5000).

### Running the Server

Start the development server:

```bash
npm start
```

The server should now be running at `http://localhost:5000`.

## API Documentation

### Auth Routes

- **POST** `/api/auth/signup`: Register a new user.
  - **Request Body**: `{ "username": "example", "email": "example@example.com", "password": "password123" }`
  - **Response**: `{ "message": "User registered successfully", "token": "JWT token" }`

- **POST** `/api/auth/signin`: Log in an existing user.
  - **Request Body**: `{ "email": "example@example.com", "password": "password123" }`
  - **Response**: `{ "message": "User logged in successfully", "token": "JWT token" }`

### Todo Routes

- **GET** `/api/todos`: Get all todos for the authenticated user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: `[ { "id": 1, "title": "Sample Todo", "completed": false } ]`

- **POST** `/api/todos`: Create a new todo item.
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: `{ "title": "New Todo" }`
  - **Response**: `{ "id": 2, "title": "New Todo", "completed": false }`

- **PUT** `/api/todos/:id`: Update a specific todo item.
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: `{ "title": "Updated Todo", "completed": true }`
  - **Response**: `{ "id": 2, "title": "Updated Todo", "completed": true }`

- **DELETE** `/api/todos/:id`: Delete a specific todo item.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: `{ "message": "Todo deleted successfully" }`

## Project Structure

```
.
├── config
│   └── db.js          # mongoose db starter
├── database   
│   └── index.js       # schema models for mongodb 
├── middleware
|   └── user.js        # auth middleware
├── routes
|   ├── todo.js        # /todo logic
|   └── user.js        # /user logic
├── .env               # environment vars
├── .gitignore         # .gitignore file
├── package.lock.json   
├── Readme.md          # Project documentation
├── package.json       # Node.js dependencies and scripts
└── index.js           # Entry point for the server
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or issues, please contact [here](mahendradewangan195@gmail.com).