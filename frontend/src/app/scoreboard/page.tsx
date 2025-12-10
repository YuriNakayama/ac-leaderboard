"use client";

import { useScoreStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScoreboardPage() {
  const { scores, currentUser, logout } = useScoreStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!currentUser) {
    return null;
  }

  // スコアを降順でソート
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-black">AC Leaderboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ログイン中: {currentUser.username} ({currentUser.role === "admin" ? "管理者" : "参加者"})
              </span>
              {currentUser.role === "admin" && (
                <Link
                  href="/admin"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  管理者ページ
                </Link>
              )}
              <Link
                href="/upload"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                スコアをアップロード
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">スコアボード</h2>
            <p className="text-sm text-gray-600 mt-1">
              総エントリー数: {scores.length}
            </p>
          </div>

          {scores.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              まだスコアが登録されていません。
              <br />
              CSVファイルをアップロードしてスコアを追加してください。
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      順位
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      参加者名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      スコア
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      送信日時
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedScores.map((score, index) => (
                    <tr key={score.id} className={index < 3 ? "bg-yellow-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {score.participantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {score.score.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(score.submittedAt).toLocaleString("ja-JP")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
