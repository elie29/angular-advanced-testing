export interface User {
  email: string;
  timestamp: number;
  authenticated: boolean;
}

export const createUser = (email: string): User => ({
  email,
  timestamp: Date.now(),
  authenticated: true
});
