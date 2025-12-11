"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
};

export default function AppLayout({
  children,
  title,
  showBackButton = false,
  backButtonText = "スコアボードに戻る",
  backButtonHref = "/scoreboard",
}: AppLayoutProps) {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="page-container">
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-inner">
            <h1 className="nav-title">{title || "AC Leaderboard"}</h1>
            {currentUser ? (
              <div className="nav-actions">
                <span className="text-sm text-muted">
                  ログイン中: {currentUser.username} ({currentUser.role === "admin" ? "管理者" : "参加者"})
                </span>
                {currentUser.role === "admin" && (
                  <>
                    {pathname === "/admin" && (
                      <Link href="/admin/users" className="btn btn-admin">
                        ユーザー管理
                      </Link>
                    )}
                    {pathname === "/admin/users" && (
                      <Link href="/admin" className="btn btn-admin">
                        スコア管理
                      </Link>
                    )}
                    {!pathname.includes("/admin") && (
                      <Link href="/admin" className="btn btn-admin">
                        管理者ページ
                      </Link>
                    )}
                  </>
                )}
                {!pathname.includes("/upload") && pathname !== "/admin" && (
                  <Link href="/upload" className="btn btn-success">
                    スコアをアップロード
                  </Link>
                )}
                {showBackButton && (
                  <Link href={backButtonHref} className="btn btn-primary">
                    {backButtonText}
                  </Link>
                )}
                <button onClick={handleLogout} className="btn btn-danger">
                  ログアウト
                </button>
              </div>
            ) : (
              showBackButton && (
                <Link href={backButtonHref} className="btn btn-primary">
                  {backButtonText}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}
