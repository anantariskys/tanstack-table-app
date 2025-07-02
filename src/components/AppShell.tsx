"use client";

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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Calendar,
  MessageSquare,
  BookOpen,
  FileBarChart,
  Users,
  Settings,
  LogOut,
  Search,
  Moon,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/" },
  {
    label: "Alumni",
    icon: GraduationCap,
    initiallyOpened: true,
    links: [
      { label: "Basic Info", link: "/alumni/basic" },
      { label: "Educational Info", link: "/alumni/education" },
      { label: "Professional Info", link: "/alumni/professional" },
      { label: "Engagement", link: "/alumni/engagement" },
    ],
  },
  { label: "Job", icon: Briefcase, link: "/job" },
  { label: "Event", icon: Calendar, link: "/event" },
  { label: "Forum", icon: MessageSquare, link: "/forum" },
  { label: "Resource", icon: BookOpen, link: "/resource" },
  { label: "Report", icon: FileBarChart, link: "/report" },
  { label: "Users", icon: Users, link: "/users" },
  { label: "Setting", icon: Settings, link: "/settings" },
];

interface RootAppLayoutProps {
  children: React.ReactNode;
}

export default function RootAppLayout({ children }: RootAppLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Group align="center" justify="center" w="100%">
            <Group justify="center">
              <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z" fill="#3A04FF"/>
                <path d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z" fill="#3A04FF"/>
              </svg>
              <Stack gap={0}>
                <Text c="blue" fw={700} fz="lg">
                  Information
                </Text>
                <Text c="blue" fz="lg">Technology</Text>
              </Stack>
            </Group>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              leftSection={<item.icon size={16} />}
              childrenOffset={28}
              defaultOpened={item.initiallyOpened}
              href={item.links ? "#" : item.link}
            >
              {item.links?.map((link) => (
                <NavLink
                  key={link.label}
                  label={link.label}
                  href={link.link}
                  style={{ borderLeft: "0.5px solid #94a8d0" }}
                />
              ))}
            </NavLink>
          ))}
        </AppShell.Section>

        <AppShell.Section>
          <Button
            variant="transparent"
            c="dark"
            leftSection={<LogOut size={18} />}
          >
            Log Out
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main >
        <AppShell.Header>
          <Group h="100%" justify="space-between">
            <Group h="100%" px="md">
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
                color="gray"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
                color="gray"
              />
            </Group>

            <Group h="100%" w={400} px="md">
              <TextInput
                w="100%"
                leftSection={<Search size={16} />}
                placeholder="Search something"
              />
            </Group>

            <Group h="100%" px="md">
              <ActionIcon variant="light" color="blue">
                <Moon size={18} />
              </ActionIcon>
              <Avatar src="https://i.pravatar.cc/300" alt="it's me" />
              <Box>
                <Text fz="sm" fw="bold">
                  Hello, Admin!
                </Text>
                <Text fz="xs">Administrator</Text>
              </Box>
            </Group>
          </Group>
        </AppShell.Header>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
