import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="w-full flex flex-col">
              <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16 px-4">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href="/">Accueil</Link>
                  <Link href="/genre">Genre</Link>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}{" "}
              </nav>
              <div className="p-4">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
