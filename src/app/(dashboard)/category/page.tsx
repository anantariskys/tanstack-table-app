'use client';

import { ReusableTable } from '@/components/ReusableTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  Container,
  Title,
  Center,
  Text,
  Group,
  Stack,
  Button,
  LoadingOverlay,
  ActionIcon,
  Menu,
  TextInput,
  Select,
} from '@mantine/core';
import { Fragment, useState } from 'react';
import { FileUp, UserPlus, FileDown, Pencil, Trash, Settings, Search } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

import { useCategories } from '@/hooks/useCategories';
import { AddModal } from '@/components/(dashboard)/category/AddModal';
import moment from 'moment';
import { UpdateModal } from '@/components/(dashboard)/category/UpdateModal';
import { Category } from '@/schemas/categories';
import { DeleteModal } from '@/components/(dashboard)/category/DeleteModal';

export default function CategoryPage() {
  const { data: categories, isLoading, error } = useCategories();
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    openEditModal();
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    openDeleteModal();
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: (row) => {
        const date = moment(row.createdAt).format('MMMM D, YYYY');
        return date;
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
        <Text color="red">Error loading categories.</Text>
      </Center>
    );
  }

  return (
    <Fragment>
      {}
      <Container maw={'100rem'} py="md">
        <Group mb={24} justify="space-between">
          <Stack gap={0}>
            <Text>Manage</Text>
            {}
            <Title order={2} mb="md">
              Categories
            </Title>
          </Stack>
          <Group>
            <Button variant="outline" color="gray" c={'dark'} leftSection={<FileUp size={16} />}>
              Import CSV
            </Button>
            <Button color="blue" leftSection={<UserPlus size={16} />} onClick={openAddModal}>
              Add Category
            </Button>
          </Group>
        </Group>
        <Group mb={16} justify="end">
          <TextInput
            size="xs"
            leftSection={<Search size={16} />}
            placeholder="Search in category table"
          />
          {/* <Select
            size="xs"
            value={statusFilter}
            onChange={setStatusFilter}
            data={['Active', 'Inactive', 'Pending']}
            placeholder="Filter by status"
          /> */}
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
        <ReusableTable isLoading={isLoading} data={categories?.data ?? []} columns={columns} />
      </Container>
      <AddModal opened={addModalOpened} onClose={closeAddModal} />
      <UpdateModal
        initialData={{ name: selectedCategory?.name ?? '', id: selectedCategory?.id ?? 0 }}
        onClose={closeEditModal}
        opened={editModalOpened}
      />
      <DeleteModal
        initialData={{ id: selectedCategory?.id ?? 0 }}
        onClose={closeDeleteModal}
        opened={deleteModalOpened}
      />
    </Fragment>
  );
}
