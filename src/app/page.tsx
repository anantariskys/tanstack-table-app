'use client';

import { Container } from '@mantine/core';
import { ReusableTable } from '@/components/ReusableTable'; 
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const columnHelper = createColumnHelper<User>();

const columns: ColumnDef<User, any>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    meta: { width: '80px' },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: { width: '200px' },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
    meta: { width: '250px' },
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => info.getValue(),
    meta: { width: '120px' },
  }),
];


const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

export default function Home() {
  return (
    <Container py="md">
      <ReusableTable<User> data={data} columns={columns} />
    </Container>
  );
}
