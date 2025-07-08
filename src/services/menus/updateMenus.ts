import { Menu, UpdateMenuPayload } from '@/schemas/menu';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import { postStorage } from '../storages/storages';

export async function updateMenus(payload: UpdateMenuPayload): Promise<ResponseType<Menu>> {
  const session = await getSession();
  let uploadedPhoto = '';

  if (payload.photo instanceof File) {
    const uploadRes = await postStorage({ photo: payload.photo });

    if (!uploadRes.data?.url) {
      throw new Error('Upload failed');
    }

    uploadedPhoto = uploadRes.data.url;
  }

  const { id, ...rest } = payload;

  const response = await api.patch(
    `/menus/${id}`,
    {
      ...rest,
      ...(uploadedPhoto && { photoUrl: uploadedPhoto }),
    },
    {
      headers: {
        Authorization: `Bearer ${session?.tokens?.accessToken}`,
      },
    },
  );

  return response.data;
}
