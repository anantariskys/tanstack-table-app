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

export default function LoginPage() {
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginPayload) => {
    const randomBoolean = Math.random() < 0.5;
    if (randomBoolean) {
      notifications.show({
        message: 'Login successful',
        color: 'green',
        autoClose: 1000,
      });
    } else {
      notifications.show({
        message: 'Login failed',
        color: 'red',
        autoClose: 1000,
      });
    }
    console.log(values);
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
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" size="sm" />
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
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
