// Auth service types (Models/entities)
export interface LoginData {
  accessToken: string;
  token_type: string;
  user: User;
}

export interface AppData {
  permissions: string[];
}

export interface User {
  id: number;
  full_name: string;
  image: string;
  username: string;
  email: string;
  last_name: string;
  passport_number: number;
  national_number: number;
  subscriptions: any[];
  phone: number;
  avatar: string;
  first_name: string;
  mobile_number: string;
  gender: string;
  created_at: string;
  role: {
    name_en: string;
  };
  updated_at: string;
  created_since: string;
  updated_since: string;
}
