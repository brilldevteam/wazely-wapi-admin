export interface StartImpersonationResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
} 

export interface SwitchToTenantResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    isSelfTenant: boolean;
  };
}