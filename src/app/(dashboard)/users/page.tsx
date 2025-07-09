'use client';

import { AddModal } from '@/components/(dashboard)/users/AddModal';
import { UpdateModal } from '@/components/(dashboard)/users/UpdateModal';
import { ReusableTable } from '@/components/ReusableTable';
import { useUser } from '@/hooks/useUsers';
import { User } from '@/schemas/users/user';
import { moment } from '@/utils/moment';
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  Pagination,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { FileDown, FileUp, Pencil, Search, Trash, UserPlus } from 'lucide-react';
import { Fragment, useState } from 'react';

export default function MenuPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: users, isLoading, error } = useUser({ limit, page, search });
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    console.log(user);
    setSelectedUser(user);
    openEditModal();
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    openDeleteModal();
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      accessorFn: (row) => row.role,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: (row) => moment(row.createdAt).format('MMMM D, YYYY'),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Group gap={4}>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => handleEdit(row.original)}
            size="sm"
          >
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => handleDelete(row.original)}
          >
            <Trash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  if (error) {
    return (
      <Center>
        <Text color="red">Error loading user.</Text>
      </Center>
    );
  }

  return (
    <Fragment>
      <Container maw={'100rem'} py="md">
        <Group mb={24} justify="space-between">
          <Stack gap={0}>
            <Text>Manage</Text>
            <Title order={2} mb="md">
              User
            </Title>
          </Stack>
          <Group>
            <Button variant="outline" color="gray" c={'dark'} leftSection={<FileUp size={16} />}>
              Import CSV
            </Button>
            <Button color="blue" leftSection={<UserPlus size={16} />} onClick={openAddModal}>
              Add User
            </Button>
          </Group>
        </Group>

        <Group mb={16} justify="space-between">
          <Group>
            <TextInput
              size="xs"
              leftSection={<Search size={16} />}
              placeholder="Search in menu table"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Group>

          <Group>
            <Select
              size="xs"
              w={120}
              value={limit.toString()}
              onChange={(value) => {
                setLimit(Number(value));
                setPage(1);
              }}
              data={['1', '5', '10', '20', '50', '100']}
              placeholder="Limit"
            />

            <Button size="xs" rightSection={<FileDown size={16} />}>
              Export Data
            </Button>
          </Group>
        </Group>

        <ReusableTable isLoading={isLoading} data={users?.data ?? []} columns={columns} />

        <Group mt="md" justify="center">
          {users?.meta.totalPage && (
            <Pagination total={users.meta.totalPage} value={page} onChange={setPage} size="sm" />
          )}
        </Group>
      </Container>

      <AddModal opened={addModalOpened} onClose={closeAddModal} />
      <UpdateModal
        opened={editModalOpened}
        onClose={closeEditModal}
        initialData={{
          id: selectedUser?.id || 0,
          name: '',
          email: selectedUser?.email || '',
          username: selectedUser?.username || '',
          role: selectedUser?.role || 'owner',
          password: '',
          restaurantId: 0,
        }}
      />
      {/* <DeleteModal
        onClose={closeDeleteModal}
        opened={deleteModalOpened}
        initialData={{ id: selectedMenu?.id ?? 0 }}
      /> */}
    </Fragment>
  );
}
