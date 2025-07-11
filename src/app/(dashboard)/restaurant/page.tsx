'use client';

import { AddModal } from '@/components/(dashboard)/users/AddModal';
import { DeleteModal } from '@/components/(dashboard)/users/DeleteModal';
import { UpdateModal } from '@/components/(dashboard)/users/UpdateModal';
import { ReusableTable } from '@/components/ReusableTable';
import { useRestaurant } from '@/hooks/useRestaurant';
import { Restaurant } from '@/schemas/restaurant';
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
  Box,
  Card,
  Tooltip,
  Badge,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import {
  Archive,
  Calendar,
  Eye,
  FileDown,
  FileUp,
  Filter,
  Pencil,
  RefreshCw,
  Search,
  Store,
  Tag,
  Trash,
} from 'lucide-react';
import { Fragment, useState } from 'react';

export default function RestaurantPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: restaurants, isLoading, error } = useRestaurant({ limit, page, search });
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleEdit = (restaurant: Restaurant) => {
    console.log(restaurant);
    setSelectedRestaurant(restaurant);
    openEditModal();
  };

  const handleDelete = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    openDeleteModal();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const columns: ColumnDef<Restaurant>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created Date',
      cell: ({ row }) => {
        const date = moment(row.original.createdAt);
        const isRecent = date.isAfter(moment().subtract(7, 'days'));

        return (
          <Group gap="xs">
            <Calendar size={14} style={{ color: 'var(--mantine-color-gray-6)' }} />
            <Text fz="sm" c="gray.7">
              {date.format('MMM D, YYYY')}
            </Text>
            {isRecent && (
              <Badge size="xs" variant="light" color="green">
                New
              </Badge>
            )}
          </Group>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Group gap={4}>
          <Tooltip label="View Details">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              style={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: 'var(--mantine-color-gray-1)',
                },
              }}
            >
              <Eye size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit Category">
            <ActionIcon
              variant="subtle"
              color="blue"
              size="sm"
              onClick={() => handleEdit(row.original)}
              style={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: 'var(--mantine-color-blue-1)',
                },
              }}
            >
              <Pencil size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete Category">
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => handleDelete(row.original)}
              style={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: 'var(--mantine-color-red-1)',
                },
              }}
            >
              <Trash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  if (error) {
    return (
      <Center h="400px">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Box
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--mantine-color-red-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Archive size={24} color="var(--mantine-color-red-6)" />
            </Box>
            <Text c="red" fw={500} fz="lg">
              Error Loading User
            </Text>
            <Text c="gray.6" ta="center" fz="sm">
              Unable to fetch user data. Please try again later.
            </Text>
            <Button variant="light" color="red" onClick={handleRefresh}>
              Try Again
            </Button>
          </Stack>
        </Card>
      </Center>
    );
  }

  return (
    <Fragment>
      <Container maw={'100rem'} py="md">
        {/* Header Section */}
        <Paper
          shadow="xs"
          p="lg"
          radius="md"
          mb="lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: '1px solid var(--mantine-color-gray-2)',
          }}
        >
          <Group justify="space-between" align="flex-end">
            <Stack gap="xs">
              <Group gap="xs">
                <Tag size={16} />
                <Text fz="sm" opacity={0.9}>
                  Restaurant Management
                </Text>
              </Group>
              <Title order={1} c="white">
                Restaurant
              </Title>
              <Text fz="sm" opacity={0.8}>
                Manage and organize your Restaurant
              </Text>
            </Stack>

            <Group gap="xs">
              <Box
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Stack gap={4} align="center">
                  <Text fz="xl" fw={700} c="white">
                    {restaurants?.meta.totalData || 0}
                  </Text>
                  <Text fz="xs" c="white" opacity={0.8}>
                    Total Menu
                  </Text>
                </Stack>
              </Box>
            </Group>
          </Group>
        </Paper>

        {/* Action Buttons */}
        <Card shadow="sm" padding="md" radius="md" mb="md" withBorder>
          <Group justify="space-between">
            <Group>
              <Button
                variant="light"
                color="blue"
                leftSection={<Store size={16} />}
                onClick={openAddModal}
                style={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  },
                }}
              >
                Add Restaurant
              </Button>
              <Button
                variant="outline"
                color="gray"
                leftSection={<FileUp size={16} />}
                style={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                Import CSV
              </Button>
            </Group>

            <Group>
              <Tooltip label="Refresh Data">
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  onClick={handleRefresh}
                  loading={isRefreshing}
                  style={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: isRefreshing ? 'none' : 'rotate(180deg) scale(1.1)',
                    },
                  }}
                >
                  <RefreshCw size={18} />
                </ActionIcon>
              </Tooltip>
              <Button
                variant="outline"
                color="green"
                size="sm"
                leftSection={<FileDown size={16} />}
                style={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                Export Data
              </Button>
            </Group>
          </Group>
        </Card>

        {/* Filters Section */}
        <Card shadow="sm" padding="md" radius="md" mb="md" withBorder>
          <Group justify="space-between" align="flex-end">
            <Group>
              <TextInput
                size="sm"
                w={300}
                leftSection={<Search size={16} />}
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                styles={{
                  input: {
                    borderRadius: '20px',
                    transition: 'all 0.2s ease',
                    '&:focus': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                    },
                  },
                }}
              />
              <ActionIcon
                variant="light"
                color="gray"
                size="lg"
                style={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Filter size={18} />
              </ActionIcon>
            </Group>

            <Group>
              <Text fz="sm" c="gray.6">
                Show:
              </Text>
              <Select
                size="sm"
                w={100}
                value={limit.toString()}
                onChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
                data={['5', '10', '20', '50', '100']}
                styles={{
                  input: {
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:focus': {
                      transform: 'scale(1.02)',
                    },
                  },
                }}
              />
              <Text fz="sm" c="gray.6">
                entries
              </Text>
            </Group>
          </Group>
        </Card>

        {/* Table Section */}
        <Card shadow="sm" padding="md" radius="md" mb="md" withBorder>
          <Box
            style={{
              '& tbody tr': {
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              },
              '& tbody tr:hover': {
                backgroundColor: 'var(--mantine-color-blue-0)',
                transform: 'scale(1.01)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ReusableTable isLoading={isLoading} data={restaurants?.data ?? []} columns={columns} />
          </Box>
        </Card>

        {/* Pagination */}
        {restaurants?.meta.totalPage && restaurants.meta.totalPage > 1 && (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <Text fz="sm" c="gray.6">
                Showing {(page - 1) * limit + 1} to{' '}
                {Math.min(page * limit, restaurants.meta.totalData || 0)} of{' '}
                {restaurants.meta.totalData || 0} entries
              </Text>
              <Pagination
                total={restaurants.meta.totalPage}
                value={page}
                onChange={setPage}
                size="sm"
                styles={{
                  control: {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              />
            </Group>
          </Card>
        )}
      </Container>

      {/* <AddModal opened={addModalOpened} onClose={closeAddModal} />
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
      <DeleteModal
        onClose={closeDeleteModal}
        opened={deleteModalOpened}
        initialData={{ id: selectedUser?.id ?? 0 }}
      /> */}
    </Fragment>
  );
}
