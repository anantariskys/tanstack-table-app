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
  ActionIcon,
  TextInput,
  Select,
  Pagination,
} from '@mantine/core';
import { Fragment, useState } from 'react';
import { FileUp, UserPlus, FileDown, Pencil, Trash, Search } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

import { useCategories } from '@/hooks/useCategories';
import { AddModal } from '@/components/(dashboard)/category/AddModal';
import moment from 'moment';
import { UpdateModal } from '@/components/(dashboard)/category/UpdateModal';
import { Category } from '@/schemas/categories';
import { DeleteModal } from '@/components/(dashboard)/category/DeleteModal';

export default function CategoryPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: categories, isLoading, error } = useCategories({ limit, page, search });
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
        <Group mb={16} justify="space-between">
          <Group>
            <TextInput
              size="xs"
              leftSection={<Search size={16} />}
              placeholder="Search in category table"
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
                setPage(1); // reset page ke 1 kalau limit berubah
              }}
              data={['1', '5', '10', '20', '50', '100']}
              placeholder="Limit"
            />

            <Button size="xs" rightSection={<FileDown size={16} />}>
              Export Data
            </Button>
          </Group>
        </Group>

        <ReusableTable isLoading={isLoading} data={categories?.data ?? []} columns={columns} />
        <Group mt="md" justify="center">
          {categories?.meta.totalPage && (
            <Pagination
              total={categories.meta.totalPage}
              value={page}
              onChange={setPage}
              size="sm"
            />
          )}
        </Group>
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
