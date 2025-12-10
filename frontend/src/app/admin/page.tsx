"use client";

import AppLayout from "@/components/AppLayout";
import { useScoreStore } from "@/lib/store";
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
    <AppLayout title="AC Leaderboard - 管理者ページ" showBackButton>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">スコア管理</h2>
          <p className="card-description">
            スコアを手動で編集できます。編集ボタンをクリックして変更してください。
          </p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ margin: "1.5rem" }}>
            <p className="alert-error-title">{error}</p>
          </div>
        )}

        {scores.length === 0 ? (
          <div className="empty-state">まだスコアが登録されていません。</div>
        ) : (
          <div className="table-container">
            <table className="leaderboard-table">
              <thead className="table-head">
                <tr>
                  <th className="table-head-cell">順位</th>
                  <th className="table-head-cell">参加者名</th>
                  <th className="table-head-cell">スコア</th>
                  <th className="table-head-cell">送信日時</th>
                  <th className="table-head-cell">操作</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {sortedScores.map((score, index) => (
                  <tr key={score.id} className="table-row">
                    <td className="table-cell table-cell-primary">
                      {index + 1}
                    </td>
                    <td className="table-cell table-cell-secondary">
                      {editingId === score.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="form-input"
                          style={{ minWidth: "150px" }}
                        />
                      ) : (
                        score.participantName
                      )}
                    </td>
                    <td className="table-cell table-cell-secondary">
                      {editingId === score.id ? (
                        <input
                          type="text"
                          value={editScore}
                          onChange={(e) => setEditScore(e.target.value)}
                          className="form-input"
                          style={{ width: "120px" }}
                        />
                      ) : (
                        score.score.toFixed(4)
                      )}
                    </td>
                    <td className="table-cell table-cell-muted">
                      {new Date(score.submittedAt).toLocaleString("ja-JP")}
                    </td>
                    <td className="table-cell">
                      {editingId === score.id ? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={handleSave}
                            className="btn btn-success"
                            style={{ padding: "0.25rem 0.75rem" }}
                          >
                            保存
                          </button>
                          <button
                            onClick={handleCancel}
                            className="btn btn-secondary"
                            style={{ padding: "0.25rem 0.75rem" }}
                          >
                            キャンセル
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleEdit(
                              score.id,
                              score.participantName,
                              score.score
                            )
                          }
                          className="btn btn-primary"
                          style={{ padding: "0.25rem 0.75rem" }}
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
    </AppLayout>
  );
}
