export interface User {
  id: string;
  username: string;
  role: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}
