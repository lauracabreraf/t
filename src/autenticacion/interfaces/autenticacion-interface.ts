export interface JwtPayload {
  sub: string;   
  email: string; 
}

export interface AuthResponse {
  access_token: string; 
}
