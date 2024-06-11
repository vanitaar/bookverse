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

export interface Book {
  id: number;
  title: string;
  author_id: number;
  image_url?: string;
  blurb?: string;
  dedication?: string;
  publication_date?: Date | string;
  format_ebook?: boolean;
  format_physical?: boolean;
  format_audio?: boolean;
  series_status?: string;
  series_title?: string;
  order_in_series?: number;
  created_at?: Date;
  updated_at?: Date;
}
