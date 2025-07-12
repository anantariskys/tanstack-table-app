import { Modal, TextInput, Button, Stack, Select, Group } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserPayload, updateUserSchema } from '@/schemas/users/user';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { updateUser } from '@/services/user/updateUser';
import { useEffect } from 'react';

export function UpdateModal({
  opened,
  onClose,
  initialData,
}: {
  opened: boolean;
  onClose: () => void;
  initialData: UpdateUserPayload;
}) {
  const session = useSession();
  const form = useForm<Omit<UpdateUserPayload, 'restaurantId'>>({
    resolver: zodResolver(updateUserSchema.omit({ restaurantId: true })),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      username: '',
    },
  });

  useEffect(() => {
    if (opened) {
      form.reset(initialData);
      console.log('initialData', initialData);
    }
  }, [opened, initialData, form]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notifications.show({
        message: 'User updated successfully',
        color: 'green',
        autoClose: 1000,
      });
      handleClose();
    },
    onError: (error) => {
      notifications.show({
        message: 'Something went wrong',
        color: 'red',
        autoClose: 1000,
      });
      console.log(error);
    },
  });

  const onSubmit = (data: Omit<UpdateUserPayload, 'restaurantId'>) => {
    mutate({ ...data, restaurantId: session?.data?.restaurantId || 0 });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal centered opened={opened} onClose={handleClose} title="Add New User" size="lg">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap={'md'}>
          <Group grow>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Name"
                  placeholder="Enter name"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Username"
                  placeholder="Enter username"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Group grow>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Email"
                  placeholder="Enter email"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  error={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="role"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label="Role"
                placeholder="Select role"
                data={[
                  { value: 'owner', label: 'Owner' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'staff', label: 'Staff' },
                ]}
                error={error?.message}
                disabled={isPending}
              />
            )}
          />
          <Group justify="end" mt="md">
            <Button variant="subtle" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Add User
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
