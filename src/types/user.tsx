export interface FormUserData {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export interface UserData {
  user: FormUserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
