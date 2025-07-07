'use client';
import { AddModal } from '@/components/(dashboard)/menu/AddModal';
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
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { FileDown, FileUp, Pencil, Search, Trash, UserPlus } from 'lucide-react';
import { Fragment } from 'react';
export default function MenuPage() {
  const { data: menu, isLoading, error } = useMenus();
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  //   const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  //   const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
  //     useDisclosure(false);

  const columns: ColumnDef<Menu>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      accessorFn: (row) => {
        const price = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(row.price);
        return price;
      },
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
            // onClick={() => handleEdit(row.original)}
          >
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            // onClick={() => handleDelete(row.original)}
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
      {}
      <Container maw={'100rem'} py="md">
        <Group mb={24} justify="space-between">
          <Stack gap={0}>
            <Text>Manage</Text>
            {}
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
        </Group>
        <ReusableTable isLoading={isLoading} data={menu?.data ?? []} columns={columns} />
      </Container>
      <AddModal opened={addModalOpened} onClose={closeAddModal} />
      {/* <UpdateModal
          initialData={{ name: selectedCategory?.name ?? '', id: selectedCategory?.id ?? 0 }}
          onClose={closeEditModal}
          opened={editModalOpened}
        />
        <DeleteModal
          initialData={{ id: selectedCategory?.id ?? 0 }}
          onClose={closeDeleteModal}
          opened={deleteModalOpened}
        /> */}
    </Fragment>
  );
}
