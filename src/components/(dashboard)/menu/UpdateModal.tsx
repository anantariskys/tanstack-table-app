import {
  Modal,
  TextInput,
  Button,
  Stack,
  Group,
  FileInput,
  NumberInput,
  Textarea,
  Radio,
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateMenuPayload, updateMenuSchema } from '@/schemas/menu';
import { CategoryAutocomplete } from '../category/CategoryAutoComplete';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { updateMenus } from '@/services/menus/updateMenus';
import Image from 'next/image';

export function UpdateModal({
  opened,
  onClose,
  initialData,
  photoUrl,
}: {
  opened: boolean;
  onClose: () => void;
  initialData: UpdateMenuPayload;
  photoUrl?: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const session = useSession();
  const form = useForm<Omit<UpdateMenuPayload, 'restaurantId'>>({
    resolver: zodResolver(updateMenuSchema.omit({ restaurantId: true })),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      isAvailable: true,
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (opened) {
      form.reset(initialData);
      if (photoUrl) {
        setPreviewUrl(photoUrl);
      }
      console.log('initialData', initialData);
    }
  }, [opened, initialData, form, photoUrl]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      notifications.show({
        message: 'Menu added successfully',
        color: 'green',
        autoClose: 1000,
      });
      handleClose();
    },
    onError: () => {
      notifications.show({
        message: 'Failed to add Menu',
        color: 'red',
        autoClose: 1000,
      });
    },
  });

  const onSubmit = (data: Omit<UpdateMenuPayload, 'restaurantId'>) => {
    mutate({ ...data, restaurantId: session.data?.restaurantId || 0 });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal centered opened={opened} onClose={handleClose} title="Add New Menu" size="lg">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Group grow>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Menu Name"
                  placeholder="e.g. Spaghetti Carbonara"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState: { error } }) => (
                <NumberInput
                  {...field}
                  label="Harga"
                  placeholder="Masukkan harga"
                  error={error?.message}
                  min={0}
                  leftSection="Rp."
                  thousandSeparator
                  hideControls
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Describe the menu item"
                error={error?.message}
                disabled={isPending}
              />
            )}
          />
          <Controller
            control={form.control}
            name="isAvailable"
            render={({ field, fieldState: { error } }) => (
              <Radio.Group
                label="Menu Availability"
                value={field.value ? 'true' : 'false'}
                onChange={(val) => field.onChange(val === 'true')}
                error={error?.message}
              >
                <Group mt="xs">
                  <Radio value="true" label="Available" disabled={isPending} />
                  <Radio value="false" label="Not Available" disabled={isPending} />
                </Group>
              </Radio.Group>
            )}
          />

          <Group grow>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field, fieldState: { error } }) => (
                <CategoryAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="photo"
            render={({ field, fieldState: { error } }) => (
              <Stack gap={4}>
                {previewUrl && (
                  <Image src={previewUrl} alt="Current menu photo" width={100} height={100} />
                )}
                <FileInput
                  {...field}
                  label="Menu Photo"
                  placeholder="Upload menu image"
                  accept="image/*"
                  error={error?.message}
                  disabled={isPending}
                  onChange={(file) => {
                    field.onChange(file);
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    }
                  }}
                />
              </Stack>
            )}
          />

          <Button type="submit" loading={isPending}>
            Add Menu
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
