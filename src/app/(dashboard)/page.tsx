'use client';

import {
  Container,
  Paper,
  Title,
  Stack,
  Group,
  SimpleGrid,
  Avatar,
  Badge,
  Divider,
  Box,
} from '@mantine/core';
import { useProfile } from '@/hooks/useProfile';
import { Activity, Check, User } from 'lucide-react';

export default function Home() {
  const profile = useProfile();

  return (
    <Container size="md" py="xl" style={{ display: 'flex', alignItems: 'center' }}>
      <Paper
        shadow="lg"
        p="xl"
        radius="lg"
        w="100%"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: '1px solid #ccc',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Semi-transparent content background */}
        <Box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1rem',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack align="center" gap="lg">
            <Title order={1} ta="center" style={{ color: 'white' }}>
              Selamat Datang di Dashboard
            </Title>

            <Box style={{ color: '#e0e0e0', textAlign: 'center', fontSize: '1.125rem' }}>
              Hai, <strong>{profile?.username || 'Guest'}</strong>! Kamu berhasil login.
            </Box>

            <Divider my="sm" color="gray" />

            <Paper
              withBorder
              p="md"
              radius="md"
              w="100%"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Group>
                <Box style={{ color: '#ddd', fontSize: '0.875rem' }}>Email</Box>
                <Box style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                  {profile?.email || 'Tidak tersedia'}
                </Box>
              </Group>
            </Paper>

            {/* Analitik Cards */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" w="100%" mt="lg">
              {[
                {
                  title: 'Total Pengguna',
                  value: '1.243',
                  icon: <User size={20} />,
                  color: 'blue',
                },
                {
                  title: 'Aktivitas Terbaru',
                  value: 'Login 2 jam lalu',
                  icon: <Activity size={20} />,
                  color: 'teal',
                },
                {
                  title: 'Status',
                  value: (
                    <Badge color="green" variant="light">
                      Aktif
                    </Badge>
                  ),
                  icon: <Check size={20} />,
                  color: 'green',
                },
              ].map((item, index) => (
                <Paper
                  key={index}
                  shadow="md"
                  radius="md"
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                >
                  <Group>
                    <Avatar color={item.color} radius="xl" variant="filled">
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Box style={{ color: '#ccc', fontSize: '0.875rem' }}>{item.title}</Box>
                      <Box style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700 }}>
                        {item.value}
                      </Box>
                    </Box>
                  </Group>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
