import { Modal, TextInput, Button, Stack, Select, Group } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserPayload, createUserSchema } from '@/schemas/users/user';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '@/services/user/addUser';
import { notifications } from '@mantine/notifications';

export function AddModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const session = useSession();
  const form = useForm<Omit<CreateUserPayload, 'restaurantId'>>({
    resolver: zodResolver(createUserSchema.omit({ restaurantId: true })),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      username: '',
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notifications.show({
        message: 'User added successfully',
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

  const onSubmit = (data: Omit<CreateUserPayload, 'restaurantId'>) => {
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
