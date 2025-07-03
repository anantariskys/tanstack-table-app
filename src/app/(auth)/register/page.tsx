'use client';
import { RegisterPayload, registerSchema } from '@/schemas/auth/register';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, Controller } from 'react-hook-form';

export default function RegisterPage() {
  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
    },
  });

  const onSubmit = (values: RegisterPayload) => {
    const randomBoolean = Math.random() < 0.5;
    if (randomBoolean) {
      notifications.show({
        message: 'Registration successful',
        color: 'green',
        autoClose: 1000,
      });
    } else {
      notifications.show({
        message: 'Registration failed',
        color: 'red',
        autoClose: 1000,
      });
    }
    console.log(values);
  };

  return (
    <Container size={'xs'} w={'100%'}>
      <Title ta="center" fw={900} size="h2">
        Create an account
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="a" href="/login">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Username"
                placeholder="Your username"
                radius="md"
                size="md"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Full Name"
                placeholder="Your full name"
                mt="md"
                radius="md"
                size="md"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                placeholder="your@email.com"
                mt="md"
                radius="md"
                size="md"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                radius="md"
                size="md"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
