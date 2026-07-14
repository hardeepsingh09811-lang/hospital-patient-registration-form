# Hospital Patient Registry System

This is a modern, web-based Hospital Patient Registry application with a premium glassmorphism UI. The backend is built using Node.js, Express.js, and MongoDB for secure data persistence.

## Features
- **Premium Glassmorphism UI**: Beautiful, interactive, and responsive frontend design.
- **Secure Architecture**: Database credentials are fully protected using environment variables (`dotenv`).
- **Live Database**: Form data is synced and stored permanently in a live MongoDB Atlas Cluster.
- **Dynamic Dashboard**: A dedicated view page to track all registered records securely fetched from the database.

## Tech Stack
- **Backend**: Node.js, Express.js, Mongoose ODM
- **Frontend**: HTML5, Premium CSS3 (Glassmorphism layout)
- **Database**: MongoDB Atlas (Cloud Storage)
- **Security**: Dotenv (Environment Variables)

## Files in this Project
- `app.js` - Handles Express routing, server configuration, and secure MongoDB connection.
- `index.html` - Contains the registry form structure.
- `.env` - (Kept private) Stores sensitive MongoDB configuration strings.
