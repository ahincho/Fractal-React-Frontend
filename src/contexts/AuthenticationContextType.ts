import { User } from "./User";

export interface AuthenticationContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
