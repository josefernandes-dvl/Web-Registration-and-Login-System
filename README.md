# 🚀 Registration and Login System

Aiming to professionalize the project **Registration and Login System ChaveMestre**, carried out in C, we created this full-stack project that implements a complete system for registration, login, password recovery and user management, with distinct profiles for "User" and "Administrator".

## 📝 Description

The application allows new users to register in a two-step process, defining a security question and answer. Existing users can log in, and if they forget their password, they can recover it through the secret question.

The administrator interface offers additional functionalities, such as the ability to view, search and delete users registered in the system.

The frontend is built with **React** and **Vite**, consuming a RESTful API developed in **Node.js** with **Express**. The database used is **MongoDB**, with **Prisma** acting as ORM to facilitate database operations.

---

## 🛠️ Technologies Used

This is the list of the main technologies and libraries used in the project:

#### 💻 Frontend
* React: Library for building the user interface.
* Vite: Build tool and development server for the frontend.
* React Router Dom: For managing routes and navigation in the application.
* Axios: HTTP client for making requests to the backend API.
* CSS: Styling of components through dedicated CSS files.

#### 🌐 Backend
* Node.js: Server-side JavaScript execution environment.
* Express: Framework for building the RESTful API.
* Prisma: ORM for interacting with the MongoDB database.
* Bcrypt: Library for securely encrypting and verifying passwords.
* CORS: Middleware for enabling Cross-Origin Resource Sharing.
* Dotenv: For securely managing environment variables.

#### 🗄️ Database
* MongoDB: Document-oriented NoSQL database.

---

## ▶️ How to Run the Project

Follow these instructions to set up and run the project in your local environment.

### ✅ Prerequisites

Before you begin, make sure you have the following software installed on your machine:
* Node.js (which includes npm)
* MongoDB

### ⚙️ Backend Configuration

1. Clone the Repository:
`git clone https://github.com/Rafaasj07/Cadastro_Usuarios_Web.git`
`cd Cadastro_Usuarios_Web/backend`

2. Install the Dependencies:
`npm install express mongodb cors bcrypt dotenv`
`npm install prisma --save-dev`

3. Configure the Environment Variables:
Create a `.env` file in the root of the backend folder and add your MongoDB connection string:
`DATABASE_URL="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database"`

4. Synchronize the Database with Prisma:
`npx prisma generate`
`npx prisma db push`

### 🖥️ Frontend Configuration

1. Navigate to the Frontend Folder:
`cd Cadastro_Usuarios_Web/frontend`

2. Install the Dependencies:
`npm install`

### 🚀 Running the Application

You will need two terminals open: one for the backend and one for the frontend.

1. Start the Backend Server (in the backend terminal):
`node --watch server.js`

2. Start the Frontend Server (in the frontend terminal):
`npm run dev`

---

## ✨ Useful Commands

- Prisma Studio: To view and manage your database.
`npx prisma studio`

- Check and Fix Packages:
`npm audit`
`npm audit fix`
