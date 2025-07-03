import { Modal, TextInput, Button, Stack, Select, SimpleGrid, Group } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormData, userSchema } from '@/schemas/users/user';

export function AddModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      company: '',
      jobTitle: '',
      status: 'pending',
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal centered opened={opened} onClose={handleClose} title="Add New User" size="lg">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Group grow>
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="First Name"
                  placeholder="Enter first name"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Last Name"
                  placeholder="Enter last name"
                  error={error?.message}
                />
              )}
            />
          </Group>

          <Group grow>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Email"
                  placeholder="Enter email"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Phone"
                  placeholder="Enter phone number"
                  error={error?.message}
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                label="Address"
                placeholder="Enter address"
                error={error?.message}
              />
            )}
          />
          <SimpleGrid cols={3}>
            <Controller
              control={form.control}
              name="city"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="City"
                  placeholder="Enter city"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="state"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="State"
                  placeholder="Enter state"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="country"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Country"
                  placeholder="Enter country"
                  error={error?.message}
                />
              )}
            />
          </SimpleGrid>

          {/* Employment Information Group */}
          <Group grow>
            <Controller
              control={form.control}
              name="company"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Company"
                  placeholder="Enter company name"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="jobTitle"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Job Title"
                  placeholder="Enter job title"
                  error={error?.message}
                />
              )}
            />
          </Group>

          <Controller
            control={form.control}
            name="status"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label="Status"
                placeholder="Select status"
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'pending', label: 'Pending' },
                ]}
                error={error?.message}
              />
            )}
          />
          <Button type="submit">Add User</Button>
        </Stack>
      </form>
    </Modal>
  );
}
