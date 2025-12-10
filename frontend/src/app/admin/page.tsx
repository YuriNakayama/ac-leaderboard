"use client";

import { useScoreStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { scores, currentUser, updateScore } = useScoreStore();
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editScore, setEditScore] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleEdit = (id: string, name: string, score: number) => {
    setEditingId(id);
    setEditName(name);
    setEditScore(score.toString());
    setError("");
  };

  const handleSave = () => {
    if (!editingId) return;

    const scoreValue = parseFloat(editScore);
    if (isNaN(scoreValue) || scoreValue < 0) {
      setError("スコアは0以上の数値である必要があります");
      return;
    }

    if (editName.trim() === "") {
      setError("参加者名は必須です");
      return;
    }

    updateScore(editingId, {
      participantName: editName,
      score: scoreValue,
    });

    setEditingId(null);
    setEditName("");
    setEditScore("");
    setError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditScore("");
    setError("");
  };

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  // スコアを降順でソート
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-black">AC Leaderboard - 管理者ページ</h1>
            <Link
              href="/scoreboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              スコアボードに戻る
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">スコア管理</h2>
            <p className="text-sm text-gray-600 mt-1">
              スコアを手動で編集できます。編集ボタンをクリックして変更してください。
            </p>
          </div>

          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {scores.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              まだスコアが登録されていません。
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedScores.map((score, index) => (
                    <tr key={score.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingId === score.id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          score.participantName
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingId === score.id ? (
                          <input
                            type="text"
                            value={editScore}
                            onChange={(e) => setEditScore(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-32"
                          />
                        ) : (
                          score.score.toFixed(4)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(score.submittedAt).toLocaleString("ja-JP")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingId === score.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                              保存
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                            >
                              キャンセル
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(score.id, score.participantName, score.score)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            編集
                          </button>
                        )}
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
