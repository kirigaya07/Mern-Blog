# MERN Blog

## Overview

This is a feature-rich blog platform developed using the **MERN stack** (MongoDB, Express.js, React, Node.js). The application allows users to create and manage their profiles, write blog posts, and interact with other users' content. Admins have the ability to moderate the platform by removing users and posts.

The project includes user authentication, file storage, and a modern user interface with dark mode support. It also integrates **Google OAuth** for easy sign-up/sign-in and leverages **JWT** tokens for secure authentication.

You can check the live version of the site here: [MERN Blog Demo](https://mern-blog-j641.onrender.com)

## Features

### User Authentication
- **Google OAuth**: Users can sign up or log in via their Google accounts, reducing the friction for user onboarding.
- **Email and Password Authentication**: Traditional sign-in and sign-up using email and password are supported. Passwords are securely hashed using **bcrypt**.
- **JWT-based Sessions**: After login, users receive a **JSON Web Token (JWT)** stored in cookies for secure session management.

### Blog Functionality
- **Create, Edit, and Delete Posts**: Logged-in users can compose new blog posts, edit their existing posts, or delete posts they no longer wish to display.
- **Image Uploads**: When creating blog posts, users can upload images that are stored in **Google Firebase Storage** and displayed on their posts.
- **Commenting System**: Users can leave comments on blog posts, allowing interaction between authors and readers.
  
### Profile Management
- **User Profiles**: Users can create detailed profiles, including uploading profile pictures. The profile page displays all the blog posts they’ve authored.
- **Profile Editing**: Users can update their personal information and manage their posts directly from their profile page.

### Admin Capabilities
- **Admin Dashboard**: Admins have special privileges to manage the platform. They can view all users and posts, with the ability to delete inappropriate users or content.
- **User & Post Management**: Admins can delete users or posts from the platform if deemed necessary.

### UI and UX
- **Modern UI**: Built with **React** and **Tailwind CSS**, the website offers a clean, responsive design that works on all screen sizes.
- **Dark Mode Support**: The platform supports a fully responsive dark mode across all pages, improving the user experience for night-time browsing.
- **Animations**: Smooth animations are used for page transitions, and complex UI elements are incorporated to enhance the overall user experience.

### Backend Features
- **RESTful API**: The backend server is designed as a **REST API** built with **Express.js** to handle requests from the frontend. 
- **MongoDB**: The database of choice is **MongoDB**, which handles all user data, posts, and comments.
- **Security**: All sensitive data, such as passwords, are encrypted using **bcrypt**. Sessions are managed using **JWT** for secure authentication.

## Project Architecture

The application follows a typical MERN stack architecture:

- **Frontend**: React.js with Redux Toolkit for state management.
- **Backend**: Node.js with Express.js, serving as the REST API and handling all business logic.
- **Database**: MongoDB for storage of user, post, and comment data.
- **Authentication**: Google OAuth2 and JWT-based authentication.
- **File Storage**: Google Firebase for hosting uploaded media like profile pictures and post images.

## Live Demo

Check out the live version of the app here:  
**[MERN Blog Live](https://mern-blog-j641.onrender.com)**

## Tech Stack

### Frontend:
- **React.js**: Used to build the user interface.
- **Redux Toolkit**: Used for state management, handling authentication, user data, and posts.
- **React Router**: For routing between pages.
- **Tailwind CSS**: For styling and building a responsive, modern UI.
- **React Icons**: For incorporating sleek icons across the UI.
  
### Backend:
- **Node.js**: Handles the server-side functionality.
- **Express.js**: Serves as the framework for building RESTful APIs.
- **MongoDB**: Stores all the data related to users, posts, comments, and admin settings.
- **JWT**: Used for secure authentication via JSON Web Tokens.
- **bcrypt**: Used for hashing user passwords.

### Third-Party Integrations:
- **Google OAuth2**: Used for enabling Google login/signup functionality.
- **Google Firebase Storage**: Used to store user-uploaded images.
- **Axios**: To handle API requests between the frontend and backend.

## Installation and Setup

To run the project locally, follow the steps below:

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node package manager)
- MongoDB (either local instance or MongoDB Atlas for cloud hosting)

### Clone the Repository
```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following:
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   ```

4. Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend server:
   ```bash
   npm start
   ```

### Running the Application
Once both the frontend and backend are running, open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Ensure that you have these environment variables set up properly for the project to run:

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.: Firebase configuration details for image storage.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit pull requests. You can also submit issues for any bugs or improvements you'd like to suggest.
