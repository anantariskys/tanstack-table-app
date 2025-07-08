import { DeleteMenuPayload, deleteMenuSchema } from '@/schemas/menu';
import { deleteMenus } from '@/services/menus/deleteMenus';
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
  initialData: DeleteMenuPayload;
}) {
  const form = useForm<DeleteMenuPayload>({
    resolver: zodResolver(deleteMenuSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (opened) {
      form.reset(initialData);
    }
  }, [opened, initialData, form]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      notifications.show({
        title: 'Success',
        message: 'Menu deleted successfully',
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
    <Modal centered opened={opened} onClose={handleClose} title="Delete Menu" size="md">
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
            Delete Category
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
