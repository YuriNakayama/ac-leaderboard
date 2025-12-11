"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/scoreboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-900">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            AC Leaderboard
          </h1>
          <p className="text-gray-900">
            機械学習コンペティションのリーダーボード
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full text-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full text-center py-3 px-4 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              新規登録
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/scoreboard"
              className="block w-full text-center py-2 px-4 text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              リーダーボードを見る
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-900">
          <p>アカウントを作成して競技に参加しましょう</p>
        </div>
      </div>
    </div>
  );
}
