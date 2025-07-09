'use client';

import { AddModal } from '@/components/(dashboard)/menu/AddModal';
import { DeleteModal } from '@/components/(dashboard)/menu/DeleteModal';
import { UpdateModal } from '@/components/(dashboard)/menu/UpdateModal';
import { ReusableTable } from '@/components/ReusableTable';
import { useMenus } from '@/hooks/useMenus';
import { Menu } from '@/schemas/menu';
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
  Badge,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { FileDown, FileUp, Pencil, Search, Trash, UserPlus } from 'lucide-react';
import { Fragment, useState } from 'react';

export default function MenuPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: menu, isLoading, error } = useMenus({ limit, page, search });
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const handleEdit = (menu: Menu) => {
    console.log(menu);
    setSelectedMenu(menu);
    openEditModal();
  };

  const handleDelete = (menu: Menu) => {
    setSelectedMenu(menu);
    openDeleteModal();
  };

  const columns: ColumnDef<Menu>[] = [
    {
      accessorKey: 'photoUrl',
      header: 'Image',
      cell: ({ row }) => (
        <Center>
          <Image w={200} src={row.original.photoUrl} alt={`image ${row.original.name}`} />
        </Center>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      accessorFn: (row) => row.category?.name ?? '',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      accessorFn: (row) =>
        new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(row.price),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: (row) => moment(row.createdAt).format('MMMM D, YYYY'),
    },
    {
      accessorKey: 'isAvailable',
      header: 'Stok',
      cell: ({ row }) => (
        <Badge color={row.original.isAvailable ? 'green' : 'red'}>
          {row.original.isAvailable ? 'ada' : 'kosong'}
        </Badge>
      ),
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
        <Text color="red">Error loading menus.</Text>
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
              Menus
            </Title>
          </Stack>
          <Group>
            <Button variant="outline" color="gray" c={'dark'} leftSection={<FileUp size={16} />}>
              Import CSV
            </Button>
            <Button color="blue" leftSection={<UserPlus size={16} />} onClick={openAddModal}>
              Add Menu
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

        <ReusableTable isLoading={isLoading} data={menu?.data ?? []} columns={columns} />

        <Group mt="md" justify="center">
          {menu?.meta.totalPage && (
            <Pagination total={menu.meta.totalPage} value={page} onChange={setPage} size="sm" />
          )}
        </Group>
      </Container>

      <AddModal opened={addModalOpened} onClose={closeAddModal} />
      <UpdateModal
        opened={editModalOpened}
        onClose={closeEditModal}
        initialData={{
          categoryId: selectedMenu?.category?.id ?? 0,
          name: selectedMenu?.name ?? '',
          description: selectedMenu?.description ?? '',
          price: selectedMenu?.price ?? 0,
          id: selectedMenu?.id ?? 0,
          restaurantId: selectedMenu?.restaurantId ?? 0,
          isAvailable: selectedMenu?.isAvailable ?? false,
        }}
        photoUrl={selectedMenu?.photoUrl}
      />
      <DeleteModal
        onClose={closeDeleteModal}
        opened={deleteModalOpened}
        initialData={{ id: selectedMenu?.id ?? 0 }}
      />
    </Fragment>
  );
}
