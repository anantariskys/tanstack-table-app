import {
  Modal,
  TextInput,
  Button,
  Stack,
  Group,
  FileInput,
  NumberInput,
  Textarea,
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMenuPayload, createMenuSchema } from '@/schemas/menu';
import { CategoryAutocomplete } from '../category/CategoryAutoComplete';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenus } from '@/services/menus/addMenus';
import { notifications } from '@mantine/notifications';

export function AddModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const session = useSession();
  const form = useForm<Omit<CreateMenuPayload, 'restaurantId'>>({
    resolver: zodResolver(createMenuSchema.omit({ restaurantId: true })),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      isAvailable: true,
      categoryId: 0,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addMenus,
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

  const onSubmit = (data: Omit<CreateMenuPayload, 'restaurantId'>) => {
    mutate({ ...data, restaurantId: session?.data?.restaurantId || 0 });
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
              />
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
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="photo"
            render={({ field, fieldState: { error } }) => (
              <FileInput
                {...field}
                label="Menu Photo"
                placeholder="Upload menu image"
                accept="image/*"
                error={error?.message}
              />
            )}
          />

          <Button type="submit">Add Menu</Button>
        </Stack>
      </form>
    </Modal>
  );
}
