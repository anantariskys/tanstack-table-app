import { UpdateCategoryPayload, updateCategorySchema } from '@/schemas/categories';
import { updateCategories } from '@/services/categories/updateCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export function UpdateModal({
  opened,
  onClose,
  initialData,
}: {
  opened: boolean;
  onClose: () => void;
  initialData: UpdateCategoryPayload & { id: number };
}) {
  const form = useForm<UpdateCategoryPayload>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (opened) {
      form.reset(initialData);
    }
  }, [opened, initialData, form]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      notifications.show({
        title: 'Success',
        message: 'Category updated successfully',
        color: 'green',
      });
      handleClose();
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    },
  });

  const onSubmit = (data: UpdateCategoryPayload) => {
    mutate({ id: initialData.id, ...data });
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
                  label="First Name"
                  placeholder="Enter first name"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Button type="submit" loading={isPending}>
            Update Category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
