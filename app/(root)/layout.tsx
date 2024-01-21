import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { dark } from "@clerk/themes";
import { MyThemeContextProvider } from "@/store/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abi's Book Club",
  description: "A Next.js 13 Blog Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyThemeContextProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <html lang="en">
          <body className={inter.className}>
            <Topbar />
            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
              <RightSidebar />
            </main>
            <Bottombar />
          </body>
        </html>
      </ClerkProvider>
    </MyThemeContextProvider>
  );
}
