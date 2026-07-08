// Environment Types
export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
  ALLOWED_ORIGINS?: string;
  ENVIRONMENT?: string;
}

// Context Variables
export interface Variables {
  userId?: string;
}

// Standard API Response Types
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// JWT Payload Types
export interface JWTPayload {
  sub: string; // user_id
  aud: string;
  exp: number;
  iat: number;
  email?: string;
  email_verified?: boolean;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}

// Request context
export interface RequestContext {
  userId: string;
  userEmail?: string;
  timestamp: number;
}
