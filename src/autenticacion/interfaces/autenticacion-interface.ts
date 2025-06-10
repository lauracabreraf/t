export interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
}
