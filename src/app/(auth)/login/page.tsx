'use client';

import { LoginPayload, loginSchema } from '@/schemas/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (values: LoginPayload) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!res?.error) {
        notifications.show({
          message: 'Login successful',
          color: 'green',
          autoClose: 1000,
        });

        console.log(res);

        router.push('/');
      } else {
        notifications.show({
          message: 'Login failed: invalid credentials',
          color: 'red',
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error(err);
      notifications.show({
        message: 'An error occurred during login',
        color: 'red',
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={'xs'} w={'100%'}>
      <Title ta="center" fw={900} size="h2">
        Welcome back!
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="a" href="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                placeholder="Your email"
                radius="md"
                size="md"
                error={fieldState.error?.message}
                disabled={loading}
                type="email"
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
                disabled={loading}
                {...field}
              />
            )}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" size="sm" disabled={loading} />
            <Anchor component="button" size="sm" fw={500}>
              Forgot password?
            </Anchor>
          </Group>
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            loading={loading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
