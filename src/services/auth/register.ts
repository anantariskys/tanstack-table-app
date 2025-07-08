import { RegisterPayload } from '@/schemas/auth/register';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';

export type RegisterResponse = {
  id: number;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
  role: string | null;
  restaurant: {
    id: number;
    createdAt: string;
    name: string | null;
    address: string | null;
    description: string | null;
    phone: string | null;
  };
};

export async function register(payload: RegisterPayload): Promise<ResponseType<RegisterResponse>> {
  const response = await api.post('/auth/register', {
    ...payload,
    restaurant: {
      name: '',
      address: '',
      description: '',
      phone: '',
    },
  });
  return response.data;
}
