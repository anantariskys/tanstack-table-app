import "@mantine/core/styles.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import {
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import RootAppLayout from "@/components/AppShell";
import { Providers } from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={jakarta.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <RootAppLayout>{children}</RootAppLayout>
        </Providers>
      </body>
    </html>
  );
}
