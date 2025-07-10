'use client';
import { useProfile } from '@/hooks/useProfile';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Divider,
  Badge,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  LogOut,
  Search,
  Moon,
  Boxes,
  ForkKnifeCrossed,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard, link: '/', badge: null },
  { label: 'Category', icon: Boxes, link: '/category', badge: null },
  { label: 'Menu', icon: ForkKnifeCrossed, link: '/menu', badge: null },
  { label: 'Users', icon: Users, link: '/users', badge: null },
  { label: 'Restaurant', icon: Briefcase, link: '/restaurant', badge: null },
];

export default function RootAppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const profile = useProfile();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      styles={{
        navbar: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          borderRight: '1px solid var(--mantine-color-gray-2)',
          transition: 'all 0.3s ease',
        },
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
        },
      }}
    >
      <AppShell.Navbar p={0}>
        {/* Logo Section */}
        <AppShell.Section
          p="lg"
          style={{
            borderBottom: '1px solid var(--mantine-color-gray-2)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Group align="center" justify="center" w="100%">
            <Group justify="center">
              <Box
                style={{
                  padding: '8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <svg
                  width="40"
                  height="28"
                  viewBox="0 0 70 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z"
                    fill="white"
                  />
                  <path
                    d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z"
                    fill="white"
                  />
                </svg>
              </Box>
              <Stack gap={0}>
                <Text c="white" fw={700} fz="lg">
                  Depot 4
                </Text>
                <Text c="rgba(255, 255, 255, 0.8)" fz="xs">
                  Admin Dashboard
                </Text>
              </Stack>
            </Group>
          </Group>
        </AppShell.Section>

        {/* Navigation Section */}
        <AppShell.Section grow component={ScrollArea} p="md">
          <Stack gap="xs">
            {navigationItems.map((item) => (
              <Box
                key={item.label}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <NavLink
                  label={
                    <Group justify="space-between" w="100%">
                      <Group gap="sm">
                        <Text fz="sm" fw={500}>
                          {item.label}
                        </Text>
                        {item.badge && (
                          <Badge
                            size="xs"
                            variant="light"
                            color="blue"
                            styles={{
                              root: {
                                height: 'auto',
                                padding: '2px 6px',
                                fontSize: '11px',
                              },
                            }}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Group>
                      <ChevronRight
                        size={14}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform:
                            hoveredItem === item.label ? 'translateX(2px)' : 'translateX(0)',
                          opacity: hoveredItem === item.label ? 1 : 0,
                        }}
                      />
                    </Group>
                  }
                  leftSection={
                    <Box
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        backgroundColor:
                          hoveredItem === item.label
                            ? 'var(--mantine-color-blue-1)'
                            : 'var(--mantine-color-gray-1)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <item.icon
                        size={16}
                        style={{
                          color:
                            hoveredItem === item.label
                              ? 'var(--mantine-color-blue-6)'
                              : 'var(--mantine-color-gray-6)',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </Box>
                  }
                  href={item.link}
                  styles={{
                    root: {
                      borderRadius: '12px',
                      padding: '12px 16px',
                      border: '1px solid transparent',
                      transition: 'all 0.2s ease',
                      backgroundColor:
                        hoveredItem === item.label ? 'var(--mantine-color-blue-0)' : 'transparent',
                      borderColor:
                        hoveredItem === item.label ? 'var(--mantine-color-blue-2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'var(--mantine-color-blue-0)',
                        borderColor: 'var(--mantine-color-blue-2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                      },
                    },
                    label: {
                      fontWeight: 500,
                      color:
                        hoveredItem === item.label
                          ? 'var(--mantine-color-blue-7)'
                          : 'var(--mantine-color-gray-7)',
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </AppShell.Section>

        <Divider color="gray.2" />

        <AppShell.Section p="md">
          <Button
            variant="light"
            color="red"
            leftSection={<LogOut size={16} />}
            onClick={handleLogout}
            fullWidth
            style={{
              borderRadius: '10px',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(248, 113, 113, 0.2)',
              },
            }}
          >
            Log Out
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <AppShell.Header
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solid var(--mantine-color-gray-2)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Group h="100%" justify="space-between">
            <Group h="100%" px="md">
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
                color="gray"
                style={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
                color="gray"
                style={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </Group>

            <Group h="100%" w={400} px="md">
              <TextInput
                w="100%"
                leftSection={<Search size={16} />}
                placeholder="Search something..."
                styles={{
                  input: {
                    borderRadius: '20px',
                    backgroundColor: 'var(--mantine-color-gray-0)',
                    border: '1px solid var(--mantine-color-gray-2)',
                    transition: 'all 0.2s ease',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-blue-4)',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      transform: 'scale(1.02)',
                    },
                  },
                }}
              />
            </Group>

            <Group h="100%" px="md">
              <Tooltip label="Toggle dark mode">
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  style={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'rotate(180deg) scale(1.1)',
                    },
                  }}
                >
                  <Moon size={18} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Notifications">
                <ActionIcon
                  variant="light"
                  color="orange"
                  size="lg"
                  style={{
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Bell size={18} />
                  <Badge
                    size="xs"
                    color="red"
                    styles={{
                      root: {
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        minWidth: '16px',
                        height: '16px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 2s infinite',
                      },
                    }}
                  >
                    3
                  </Badge>
                </ActionIcon>
              </Tooltip>

              <Group
                gap="sm"
                style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--mantine-color-gray-0)',
                  border: '1px solid var(--mantine-color-gray-2)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-1)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/300"
                  alt="it's me"
                  size="sm"
                  style={{
                    border: '2px solid var(--mantine-color-blue-2)',
                  }}
                />
                <Box>
                  <Text fz="sm" fw="bold">
                    {profile?.username}
                  </Text>
                  <Text fz="xs" c="gray.6">
                    {profile?.role}
                  </Text>
                </Box>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <Box p="md">{children}</Box>
      </AppShell.Main>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </AppShell>
  );
}
