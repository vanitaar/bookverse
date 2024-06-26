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
  publication_date?: Date;
  format_ebook?: boolean;
  format_physical?: boolean;
  format_audio?: boolean;
  series_status?: string;
  series_title?: string;
  series_id?: number;
  order_in_series?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface BookSearchResult extends Book {
  author: string;
}

export interface StatusUpdate {
  id: number;
  status: string;
  created_at: Date;
}

// export interface AuthorDetailsData {
//   books: BookSearchResult[];
//   statusUpdates: StatusUpdate[];
// }

export interface AuthorDetailsData {
  author: {
    id: number;
    username: string;
    role: string;
  };
  completeSeries: BookSearchResult[];
  incompleteSeries: BookSearchResult[];
  standalones: BookSearchResult[];
  statusUpdates: StatusUpdate[];
}

export interface WatchSeriesResponse {
  message: string;
}

export interface WatchlistSeries {
  id: number;
  series_title: string;
  author_username: string;
  series_status: string;
  series_id: number;
}
