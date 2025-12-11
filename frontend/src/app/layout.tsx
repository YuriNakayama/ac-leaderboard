import { AuthProvider } from "@/lib/auth-context";
import { configureAmplify } from "@/lib/cognito-config";
import { ScoreProvider } from "@/lib/store";
import type { Metadata } from "next";
import "./globals.css";

// Amplify設定を初期化
configureAmplify();

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
        <AuthProvider>
          <ScoreProvider>{children}</ScoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
