import { CreateMenuPayload, Menu } from '@/schemas/menu';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import { postStorage } from '../storages/storages';

export async function addMenus(payload: CreateMenuPayload): Promise<ResponseType<Menu>> {
  const session = await getSession();
  let uploadedPhoto = '';

  if (payload.photo instanceof File) {
    const uploadRes = await postStorage({ photo: payload.photo });

    console.log('UPLOADED FOTO', uploadRes);

    if (!uploadRes.data?.url) {
      throw new Error('Upload failed');
    }

    uploadedPhoto = uploadRes.data.url;
  }

  const response = await api.post(
    '/menus',
    {
      ...payload,
      photo: undefined,
      photoUrl: uploadedPhoto,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.tokens?.accessToken}`,
      },
    },
  );

  return response.data;
}
