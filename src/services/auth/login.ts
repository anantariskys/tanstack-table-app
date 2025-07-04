import { LoginPayload } from '@/schemas/auth/login';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';

export type LoginResponse = {
  email: string;
  accessToken: string;
  refreshToken: string;
};

export async function login(payload: LoginPayload): Promise<ResponseType<LoginResponse>> {
  const response = await api.post('/auth/login', payload);
  return response.data;
}
