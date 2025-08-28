
// IMPORTANT: This is a simulated in-memory "database".
// In a real application, you would use a secure database and proper hashing.
// This is for demonstration purposes only and is NOT secure for production.

type User = {
  id: string;
  username: string;
  passwordHash: string; // In a real app, this would be a securely hashed password.
};

// We'll store users in memory. This will reset every time the server restarts.
const users: User[] = [
    { id: '1', username: 'admin', passwordHash: 'password' },
    { id: '2', username: 'doctor', passwordHash: 'password123' }
];

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const createUser = (username: string, passwordHash: string): User | null => {
  if (findUserByUsername(username)) {
    return null; // User already exists
  }
  const newUser: User = {
    id: (users.length + 1).toString(),
    username,
    passwordHash,
  };
  users.push(newUser);
  console.log('Current users:', users); // For debugging
  return newUser;
};
