'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Box,
  Button,
  Container,
  Grid,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { registerSchema, RegisterPayload } from '@/schemas/auth/register';
import { register } from '@/services/auth/register';

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      name: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      notifications.show({
        message: 'Registration successful',
        color: 'green',
        autoClose: 1000,
      });
      router.push('/login');
    },
    onError: () => {
      notifications.show({
        message: 'Registration failed',
        color: 'red',
        autoClose: 1000,
      });
    },
  });

  const onSubmit = (values: RegisterPayload) => {
    mutate(values);
  };

  return (
    <Container w="75%" py="xl">
      <Paper radius="md" w={'100%'} withBorder shadow="md" p={0}>
        <Grid gutter={0}>
          {/* Kiri: Form */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p={{ base: 'lg', md: 'xl' }}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack gap={'lg'}>
                  <Box ta="center">
                    <Title order={2} fw={700}>
                      Create an account
                    </Title>
                    <Text size="sm" c="dimmed">
                      Create your account to get started
                    </Text>
                  </Box>

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
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <TextInput
                        label="Full Name"
                        placeholder="Your full name"
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
                        placeholder="you@example.com"
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
                    size="md"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    loading={isPending}
                  >
                    Register
                  </Button>
                  <Text size="sm" ta={'center'} c="dimmed">
                    Already have an account?{' '}
                    <Anchor href="/login" size="sm">
                      Login
                    </Anchor>
                  </Text>
                </Stack>
              </form>
            </Box>
          </Grid.Col>

          {/* Kanan: Gambar */}
          <Grid.Col span={{ base: 0, md: 6 }} visibleFrom="md">
            <Box h="100%" pos="relative">
              <Image
                src="/authimage.jpg"
                alt="Register illustration"
                radius="md"
                h="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>

      <Text ta="center" mt="md" size="xs" c="dimmed">
        By registering, you agree to our{' '}
        <Anchor href="#" size="xs">
          Terms of Service
        </Anchor>{' '}
        and{' '}
        <Anchor href="#" size="xs">
          Privacy Policy
        </Anchor>
        .
      </Text>
    </Container>
  );
}
