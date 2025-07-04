'use client';

import { useUsers, User } from '@/hooks/useUsers';
import { ReusableTable } from '@/components/ReusableTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  Badge,
  Container,
  Title,
  Center,
  Text,
  Group,
  Stack,
  Button,
  TextInput,
  Select,
  LoadingOverlay,
  ActionIcon,
  Menu,
} from '@mantine/core';
import { Fragment, useState } from 'react';
import { Search, FileUp, UserPlus, FileDown, Pencil, Trash, Settings } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { AddModal } from '@/components/users/AddModal';
import { UpdateModal } from '@/components/users/UpdateModal';

export default function Page() {
  const { data: users = [], isLoading, error } = useUsers();
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    openEditModal();
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => {
        const status = row.getValue<string>();
        const colorMap: Record<string, string> = {
          active: 'green',
          inactive: 'red',
          pending: 'yellow',
        };
        return (
          <Badge color={colorMap[status] || 'blue'} variant="light">
            {status.toLowerCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Group gap={4}>
          <ActionIcon
            variant="subtle"
            color="blue"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" size="sm">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Center>
        <LoadingOverlay
          visible={true}
          overlayProps={{ radius: 'sm', blur: 1, opacity: 0.5, bg: 'dark' }}
        />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text color="red">Error loading users.</Text>
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
              Users Information
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
        <Group mb={16} justify="end">
          <TextInput
            size="xs"
            leftSection={<Search size={16} />}
            placeholder="Search in user table"
          />
          <Select
            size="xs"
            value={statusFilter}
            onChange={setStatusFilter}
            data={['Active', 'Inactive', 'Pending']}
            placeholder="Filter by status"
          />
          <Button size="xs" rightSection={<FileDown size={16} />}>
            Export Data
          </Button>
          <Menu withArrow position="bottom-end">
            <Menu.Target>
              <Button variant="light" color="gray" size="xs">
                <Settings size={16} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <ReusableTable data={users} columns={columns} />
      </Container>
      <AddModal opened={addModalOpened} onClose={closeAddModal} />
      <UpdateModal
        opened={editModalOpened}
        onClose={closeEditModal}
        initialData={{
          firstName: selectedUser?.firstName || '',
          lastName: selectedUser?.lastName || '',
          email: selectedUser?.email || '',
          phone: selectedUser?.phone || '',
          status: selectedUser?.status || 'pending',
          address: selectedUser?.address || '',
          city: selectedUser?.city || '',
          state: selectedUser?.state || '',
          company: selectedUser?.company || '',
          country: selectedUser?.country || '',
          jobTitle: selectedUser?.jobTitle || '',
        }}
      />
    </Fragment>
  );
}
