"use client";

import AppLayout from "@/components/AppLayout";
import {
    adminDeleteUser,
    adminDisableUser,
    adminEnableUser,
    adminListUsers,
    getUserAttribute,
} from "@/lib/admin";
import { useAuth } from "@/lib/auth-context";
import type { UserType } from "@aws-sdk/client-cognito-identity-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }
    loadUsers();
  }, [user, router]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const userList = await adminListUsers();
      setUsers(userList);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError(
        err instanceof Error ? err.message : "ユーザー一覧の取得に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableUser = async (username: string) => {
    if (!confirm(`ユーザー "${username}" を無効化しますか？`)) {
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      await adminDisableUser(username);
      setSuccessMessage(`ユーザー "${username}" を無効化しました`);
      await loadUsers();
    } catch (err) {
      console.error("Failed to disable user:", err);
      setError(
        err instanceof Error ? err.message : "ユーザーの無効化に失敗しました"
      );
    }
  };

  const handleEnableUser = async (username: string) => {
    if (!confirm(`ユーザー "${username}" を有効化しますか？`)) {
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      await adminEnableUser(username);
      setSuccessMessage(`ユーザー "${username}" を有効化しました`);
      await loadUsers();
    } catch (err) {
      console.error("Failed to enable user:", err);
      setError(
        err instanceof Error ? err.message : "ユーザーの有効化に失敗しました"
      );
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (
      !confirm(
        `ユーザー "${username}" を削除しますか？\n\nこの操作は取り消せません。`
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      await adminDeleteUser(username);
      setSuccessMessage(`ユーザー "${username}" を削除しました`);
      await loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(
        err instanceof Error ? err.message : "ユーザーの削除に失敗しました"
      );
    }
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <AppLayout title="AC Leaderboard - ユーザー管理" showBackButton>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">ユーザー管理</h2>
          <p className="card-description">
            ユーザーの有効化、無効化、削除を行うことができます。
          </p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ margin: "1.5rem" }}>
            <p className="alert-error-title">{error}</p>
          </div>
        )}

        {successMessage && (
          <div
            className="rounded-md bg-green-50 p-4"
            style={{ margin: "1.5rem" }}
          >
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        {isLoading ? (
          <div className="empty-state">読み込み中...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">ユーザーが見つかりませんでした。</div>
        ) : (
          <div className="table-container">
            <table className="leaderboard-table">
              <thead className="table-head">
                <tr>
                  <th className="table-head-cell">ユーザー名</th>
                  <th className="table-head-cell">メールアドレス</th>
                  <th className="table-head-cell">ステータス</th>
                  <th className="table-head-cell">有効/無効</th>
                  <th className="table-head-cell">作成日時</th>
                  <th className="table-head-cell">操作</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((u) => {
                  const email = getUserAttribute(u, "email");
                  const username = u.Username || "";
                  const isEnabled = u.Enabled ?? true;
                  const status = u.UserStatus || "UNKNOWN";
                  const createdAt = u.UserCreateDate
                    ? new Date(u.UserCreateDate).toLocaleString("ja-JP")
                    : "-";

                  return (
                    <tr key={username} className="table-row">
                      <td className="table-cell table-cell-primary">
                        {username}
                      </td>
                      <td className="table-cell table-cell-secondary">
                        {email || "-"}
                      </td>
                      <td className="table-cell table-cell-secondary">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : status === "UNCONFIRMED"
                                ? "bg-yellow-100 text-yellow-800"
                                : status === "FORCE_CHANGE_PASSWORD"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="table-cell table-cell-secondary">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            isEnabled
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isEnabled ? "有効" : "無効"}
                        </span>
                      </td>
                      <td className="table-cell table-cell-muted">
                        {createdAt}
                      </td>
                      <td className="table-cell">
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {isEnabled ? (
                            <button
                              onClick={() => handleDisableUser(username)}
                              className="btn btn-secondary"
                              style={{ padding: "0.25rem 0.75rem" }}
                            >
                              無効化
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEnableUser(username)}
                              className="btn btn-success"
                              style={{ padding: "0.25rem 0.75rem" }}
                            >
                              有効化
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(username)}
                            className="btn btn-danger"
                            style={{
                              padding: "0.25rem 0.75rem",
                              backgroundColor: "#dc2626",
                              color: "white",
                            }}
                          >
                            削除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
