import RootAppLayout from '@/components/AppShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RootAppLayout>{children}</RootAppLayout>;
}
