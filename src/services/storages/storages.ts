import { CreateStoragesPayload, Storages } from '@/schemas/storages';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function postStorage(payload: CreateStoragesPayload): Promise<ResponseType<Storages>> {
  const session = await getSession();

  const formData = new FormData();
  formData.append('file', payload.photo);
  formData.append('folder', 'menu');

  const response = await api.post('/storages/upload', formData, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
