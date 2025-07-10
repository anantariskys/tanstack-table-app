'use client';

import AuthIMG from '../../../../public/authimage.jpg';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginPayload } from '@/schemas/auth/login';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Divider,
  Box,
} from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { notifications } from '@mantine/notifications';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
        router.push('/');
      } else {
        notifications.show({
          message: 'Login failed: invalid credentials',
          color: 'red',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
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
    <Container w={'75%'} py="xl">
      <Paper radius="md" w={'100%'} withBorder shadow="md" p={0}>
        <Grid gutter={0}>
          {/* Left: Login Form */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p={{ base: 'lg', md: 'xl' }}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack gap={'lg'}>
                  <Box ta="center">
                    <Title order={2} fw={700}>
                      Welcome back
                    </Title>
                    <Text size="sm" c="dimmed">
                      Login to your Acme Inc account
                    </Text>
                  </Box>

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
                        radius="md"
                        size="md"
                        error={fieldState.error?.message}
                        disabled={loading}
                        {...field}
                      />
                    )}
                  />

                  <Group justify="space-between" mt="sm">
                    <Checkbox label="Remember me" size="sm" disabled={loading} />
                    <Anchor component="button" size="sm" fw={500}>
                      Forgot password?
                    </Anchor>
                  </Group>

                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    loading={loading}
                  >
                    Sign in
                  </Button>

                  <Divider label="Or continue with" labelPosition="center" />

                  <Group grow>
                    <Button variant="default" leftSection="">
                      Apple
                    </Button>
                    <Button variant="default" leftSection="G">
                      Google
                    </Button>
                    <Button variant="default" leftSection="M">
                      Meta
                    </Button>
                  </Group>

                  <Text size="sm" ta="center">
                    Don&apos;t have an account?{' '}
                    <Anchor href="/register" size="sm">
                      Sign up
                    </Anchor>
                  </Text>
                </Stack>
              </form>
            </Box>
          </Grid.Col>

          {/* Right: Image */}
          <Grid.Col span={{ base: 0, md: 6 }} visibleFrom="md">
            <Box h="100%" pos="relative">
              <Image
                src={'/authimage.jpg'}
                alt="Login illustration"
                radius="md"
                h="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>

      <Text ta="center" mt="md" size="xs" c="dimmed">
        By clicking continue, you agree to our{' '}
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
