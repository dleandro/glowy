// Authentication utilities using localStorage
import type { User } from "../types";

const STORAGE_KEY = "glowy_current_user";
const USERS_KEY = "glowy_users";

export const authService = {
  // Get current logged-in user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(STORAGE_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  // Save current user
  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  // Get all registered users
  getAllUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    if (!usersJson) return [];
    try {
      return JSON.parse(usersJson);
    } catch {
      return [];
    }
  },

  // Save all users
  saveAllUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Register a new user
  register(
    email: string,
    password: string,
    name: string,
    profile: User["profile"]
  ): User | null {
    const users = this.getAllUsers();

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return null;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=db2777&color=fff`,
      profile,
      password, // In a real app, this would be hashed
    };

    users.push(newUser);
    this.saveAllUsers(users);
    return newUser;
  },

  // Login user
  login(email: string, password: string): User | null {
    const users = this.getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return user;
    }
    return null;
  },

  // Logout user
  logout(): void {
    this.setCurrentUser(null);
  },

  // Update user profile
  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) return null;

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;

    this.saveAllUsers(users);
    this.setCurrentUser(updatedUser);

    return updatedUser;
  },
};
