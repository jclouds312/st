# MediFlow - Firebase Studio

This is a Next.js starter project for MediFlow, created in Firebase Studio.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Authentication and Database

This project is configured to use **Firebase Authentication** for user management and **Firestore** as its database.

### How it Works

- **Firebase Backend**: The authentication and database logic is handled by Firebase services. User data, appointments, and patient records are stored securely in Firestore.
- **Login/Register Pages**: The `login` and `register` pages interact directly with Firebase Authentication.
- **Protected Routes**: The main application pages are protected. Unauthenticated users will be redirected to the `/login` page.
- **Auth Context**: An `AuthContext` (`src/context/auth-context.tsx`) manages and provides the authentication state across the application by communicating with Firebase.

### **IMPORTANT: Firebase Setup**

You must have a Firebase project set up and have the correct configuration in `src/lib/firebase.ts`. The application expects to find collections for `patients` and `appointments` in your Firestore database.

If you need to seed your database with initial data, you can do so directly from the Firebase Console.
