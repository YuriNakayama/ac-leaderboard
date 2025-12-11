import {
  confirmResetPassword,
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  signUp,
  type ConfirmResetPasswordInput,
  type ConfirmSignUpInput,
  type ResetPasswordOutput,
  type SignInOutput,
  type SignUpOutput,
} from "aws-amplify/auth";
import type {
  AuthUser,
  ConfirmResetPasswordParams,
  ResetPasswordParams,
  SignInParams,
  SignUpParams,
  User,
} from "./types";

/**
 * ユーザー登録
 */
export async function authSignUp(params: SignUpParams): Promise<SignUpOutput> {
  try {
    const { email, password } = params;
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    return result;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

/**
 * 登録確認
 */
export async function authConfirmSignUp(
  email: string,
  code: string
): Promise<void> {
  try {
    const input: ConfirmSignUpInput = {
      username: email,
      confirmationCode: code,
    };
    await confirmSignUp(input);
  } catch (error) {
    console.error("Confirm sign up error:", error);
    throw error;
  }
}

/**
 * サインイン
 */
export async function authSignIn(params: SignInParams): Promise<SignInOutput> {
  try {
    const { email, password } = params;
    const result = await signIn({
      username: email,
      password,
    });
    return result;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

/**
 * サインアウト
 */
export async function authSignOut(): Promise<void> {
  try {
    await signOut();
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

/**
 * パスワードリセット開始
 */
export async function authResetPassword(
  params: ResetPasswordParams
): Promise<ResetPasswordOutput> {
  try {
    const { email } = params;
    const result = await resetPassword({
      username: email,
    });
    return result;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

/**
 * パスワードリセット確認
 */
export async function authConfirmResetPassword(
  params: ConfirmResetPasswordParams
): Promise<void> {
  try {
    const { email, code, newPassword } = params;
    const input: ConfirmResetPasswordInput = {
      username: email,
      confirmationCode: code,
      newPassword,
    };
    await confirmResetPassword(input);
  } catch (error) {
    console.error("Confirm reset password error:", error);
    throw error;
  }
}

/**
 * 現在のユーザー情報を取得
 */
export async function authGetCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

/**
 * ユーザー属性を取得
 */
export async function authGetUserAttributes() {
  try {
    const attributes = await fetchUserAttributes();
    return attributes;
  } catch (error) {
    console.error("Get user attributes error:", error);
    throw error;
  }
}

/**
 * 現在の認証セッションを取得
 */
export async function authGetSession() {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    throw error;
  }
}

/**
 * ユーザーのグループを取得
 */
export async function authGetUserGroups(): Promise<string[]> {
  try {
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload["cognito:groups"] as
      | string[]
      | undefined;
    return groups || [];
  } catch (error) {
    console.error("Get user groups error:", error);
    return [];
  }
}

/**
 * 現在のユーザー情報を取得（拡張版）
 */
export async function authGetUser(): Promise<User | null> {
  try {
    const user = await authGetCurrentUser();
    if (!user) return null;

    const attributes = await authGetUserAttributes();
    const groups = await authGetUserGroups();

    const isAdmin = groups.includes("admin");

    return {
      id: user.userId,
      username: user.username,
      email: attributes.email || "",
      role: isAdmin ? "admin" : "participant",
      groups,
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

/**
 * 管理者かどうかを確認
 */
export async function authIsAdmin(): Promise<boolean> {
  try {
    const groups = await authGetUserGroups();
    return groups.includes("admin");
  } catch (error) {
    console.error("Check admin error:", error);
    return false;
  }
}
