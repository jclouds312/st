# MediFlow - Firebase Studio

This is a Next.js starter project for MediFlow, created in Firebase Studio.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Simulated Authentication System

This project includes a **simulated authentication system** to demonstrate the user flow for login, registration, and protected routes.

### How it Works

- **Frontend Simulation**: The authentication logic is handled entirely on the client-side. User data is stored in-memory in the `src/lib/users.ts` file. This is for demonstration purposes only.
- **Login/Register Pages**: New pages have been added for `login` and `register`.
- **Protected Routes**: The main application pages (Dashboard, Appointments, etc.) are inside a route group `(app)` and are protected. Unauthenticated users will be redirected to the `/login` page.
- **Auth Context**: An `AuthContext` (`src/context/auth-context.tsx`) is used to manage and provide the authentication state across the application.

### Default Users

You can use the following credentials to log in:

- **Username**: `admin`
- **Password**: `password`

- **Username**: `doctor`
- **Password**: `password123`

You can also register new users. Since the "database" is in-memory, registered users will be lost when the development server is restarted.

### **IMPORTANT: Moving to Production**

**This simulated authentication is NOT secure and is NOT suitable for a production environment.** It does not use a real database and has no server-side validation.

For a production-ready application, you should replace the simulated system with a secure authentication service like **Firebase Authentication**.

To do this, you would typically:
1.  Set up a Firebase project and enable Firebase Authentication.
2.  Replace the logic in `src/lib/users.ts` with calls to the Firebase Auth SDK for signing in, signing up, and checking the user's session.
3.  Update the `AuthProvider` in `src/context/auth-context.tsx` to interact with Firebase.
4.  Secure your backend resources (if any) using Firebase Security Rules.
