import { DeleteUserPayload, deleteUserSchema } from '@/schemas/users/user';
import { deleteUser } from '@/services/user/deleteUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function DeleteModal({
  opened,
  onClose,
  initialData,
}: {
  opened: boolean;
  onClose: () => void;
  initialData: DeleteUserPayload;
}) {
  const form = useForm<DeleteUserPayload>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (opened) {
      form.reset(initialData);
    }
  }, [opened, initialData, form]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notifications.show({
        title: 'Success',
        message: 'User deleted successfully',
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

  const onSubmit = () => {
    mutate(form.getValues());
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal centered opened={opened} onClose={handleClose} title="Delete User" size="md">
      <Stack>
        {/* <Title>Delete Category</Title> */}
        <Text size="sm" c="dimmed">
          This action cannot be undone.
        </Text>

        <Group justify="flex-end" mt="md">
          <Button variant="light" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button color="red" onClick={onSubmit} loading={isPending}>
            Delete User
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
