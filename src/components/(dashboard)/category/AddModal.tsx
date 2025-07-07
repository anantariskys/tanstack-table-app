import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategories } from '@/services/categories/addCategories';
import { notifications } from '@mantine/notifications';
import { CreateCategoryPayload, createCategorySchema } from '@/schemas/categories';

export function AddModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const { data: session } = useSession();

  const form = useForm<Omit<CreateCategoryPayload, 'restaurantId'>>({
    resolver: zodResolver(createCategorySchema.omit({ restaurantId: true })),
    defaultValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      notifications.show({
        message: 'Category added successfully',
        color: 'green',
        autoClose: 1000,
      });
      handleClose();
    },
    onError: () => {
      notifications.show({
        message: 'Failed to add category',
        color: 'red',
        autoClose: 1000,
      });
    },
  });

  const onSubmit = (data: Omit<CreateCategoryPayload, 'restaurantId'>) => {
    if (!session?.restaurantId) {
      notifications.show({
        message: 'No restaurant found in session',
        color: 'red',
        autoClose: 1500,
      });
      return;
    }

    mutate({ ...data, restaurantId: session.restaurantId });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal centered opened={opened} onClose={handleClose} title="Add New Category" size="md">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Group grow>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Category Name"
                  placeholder="Enter category name"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Button type="submit" loading={isPending}>
            Add Category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
