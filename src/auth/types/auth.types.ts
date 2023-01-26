export interface AuthType {
  id: string;
  email: string;
  password: string;
}

export interface JwtType {
  id: string;
  email: string;
  iat: number;
  eat: number;
}
