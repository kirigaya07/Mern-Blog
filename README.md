# MERN Blog 🚀

## Overview 🌟

MERN Blog is a feature-rich blogging platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to create and manage profiles, write blog posts, and interact with other users' content through comments and likes. Admins have special privileges to moderate the platform by managing users and posts. The platform also supports modern UI/UX features like dark mode and animations.

A live demo of the application is available here:  
**[MERN Blog Live](https://mern-blog-j641.onrender.com)**

---

## Features ✨

### User Authentication 🔒

- **Google OAuth**: Users can sign up or log in via their Google accounts for a seamless onboarding experience.
- **Email and Password Authentication**: Traditional sign-in and sign-up with secure password hashing using **bcrypt**.
- **JWT-based Sessions**: Secure session management using **JSON Web Tokens (JWT)** stored in cookies.

### Blog Functionality 📝

- **Create, Edit, and Delete Posts**: Users can compose, update, or delete blog posts.
- **Image Uploads**: Users can upload images for their posts, stored in **Google Firebase Storage**.
- **Commenting System**: Users can leave comments on posts, edit or delete their own comments, and like others' comments.

### Profile Management 👤

- **User Profiles**: Users can upload profile pictures and view all their authored posts.
- **Profile Editing**: Users can update personal information and manage their posts directly from their profile page.

### Admin Capabilities 🛠️

- **Admin Dashboard**: Admins can view and manage all users, posts, and comments.
- **User & Post Management**: Admins can delete inappropriate users or content.

### UI and UX 🎨

- **Modern UI**: Built with **React** and **Tailwind CSS**, offering a clean, responsive design.
- **Dark Mode Support**: Fully responsive dark mode for improved user experience.
- **Animations**: Smooth animations for page transitions and interactive elements using **Framer Motion**.

### Backend Features ⚙️

- **RESTful API**: Built with **Express.js** to handle requests from the frontend.
- **MongoDB**: Stores user, post, and comment data.
- **Security**: Passwords are hashed using **bcrypt**, and sessions are secured with **JWT**.

---

## Project Architecture 🏗️

The application follows a typical MERN stack architecture:

- **Frontend**: React.js with Redux Toolkit for state management.
- **Backend**: Node.js with Express.js, serving as the REST API.
- **Database**: MongoDB for storing user, post, and comment data.
- **Authentication**: Google OAuth2 and JWT-based authentication.
- **File Storage**: Google Firebase for hosting uploaded media like profile pictures and post images.

---

## Tech Stack 🛠️

### Frontend:

- **React.js**: For building the user interface.
- **Redux Toolkit**: For state management.
- **React Router**: For routing between pages.
- **Tailwind CSS**: For responsive and modern styling.
- **Framer Motion**: For animations.
- **Flowbite React**: For prebuilt UI components.

### Backend:

- **Node.js**: For server-side functionality.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.
- **JWT**: For secure authentication.
- **bcrypt**: For password hashing.

### Third-Party Integrations:

- **Google OAuth2**: For Google login/signup functionality.
- **Google Firebase Storage**: For storing user-uploaded images.

---

## Installation and Setup ⚙️

To run the project locally, follow these steps:

### Prerequisites ✅

Ensure you have the following installed:

- **Node.js**
- **npm** (Node Package Manager)
- **MongoDB** (local instance or MongoDB Atlas)

### Clone the Repository 📂

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### Backend Setup 🖥️

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `api` directory and add the following:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup 🌐

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

### Running the Application 🚀

Once both the frontend and backend are running, open your browser and navigate to:  
`http://localhost:3000`

---

## Environment Variables 🔑

Ensure the following environment variables are set up:

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID.
- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret.
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.: Firebase configuration details.

---

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository and submit pull requests. You can also report issues or suggest improvements.

---

## License 📜

This project is licensed under the MIT License.
