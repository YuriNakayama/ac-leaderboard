import { ScoreProvider } from "@/lib/store";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AC Leaderboard",
  description: "Machine learning competition leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ScoreProvider>{children}</ScoreProvider>
      </body>
    </html>
  );
}
