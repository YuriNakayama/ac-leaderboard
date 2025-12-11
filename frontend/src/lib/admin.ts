import {
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
  type UserType,
} from "@aws-sdk/client-cognito-identity-provider";
import { fetchAuthSession } from "aws-amplify/auth";

/**
 * Cognito Admin APIクライアントを取得
 */
async function getCognitoClient(): Promise<CognitoIdentityProviderClient> {
  try {
    const session = await fetchAuthSession();
    const credentials = session.credentials;

    if (!credentials) {
      throw new Error("認証情報が取得できませんでした");
    }

    return new CognitoIdentityProviderClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-northeast-1",
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });
  } catch (error) {
    console.error("Failed to get Cognito client:", error);
    throw error;
  }
}

/**
 * ユーザー一覧を取得
 */
export async function adminListUsers(): Promise<UserType[]> {
  try {
    const client = await getCognitoClient();
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

    if (!userPoolId) {
      throw new Error("User Pool IDが設定されていません");
    }

    const command = new ListUsersCommand({
      UserPoolId: userPoolId,
      Limit: 60,
    });

    const response = await client.send(command);
    return response.Users || [];
  } catch (error) {
    console.error("Failed to list users:", error);
    throw error;
  }
}

/**
 * ユーザーの詳細情報を取得
 */
export async function adminGetUser(username: string): Promise<UserType> {
  try {
    const client = await getCognitoClient();
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

    if (!userPoolId) {
      throw new Error("User Pool IDが設定されていません");
    }

    const command = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });

    const response = await client.send(command);

    // UserTypeに変換
    const user: UserType = {
      Username: response.Username,
      Attributes: response.UserAttributes,
      UserCreateDate: response.UserCreateDate,
      UserLastModifiedDate: response.UserLastModifiedDate,
      Enabled: response.Enabled,
      UserStatus: response.UserStatus,
    };

    return user;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw error;
  }
}

/**
 * ユーザーを無効化
 */
export async function adminDisableUser(username: string): Promise<void> {
  try {
    const client = await getCognitoClient();
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

    if (!userPoolId) {
      throw new Error("User Pool IDが設定されていません");
    }

    const command = new AdminDisableUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });

    await client.send(command);
  } catch (error) {
    console.error("Failed to disable user:", error);
    throw error;
  }
}

/**
 * ユーザーを有効化
 */
export async function adminEnableUser(username: string): Promise<void> {
  try {
    const client = await getCognitoClient();
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

    if (!userPoolId) {
      throw new Error("User Pool IDが設定されていません");
    }

    const command = new AdminEnableUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });

    await client.send(command);
  } catch (error) {
    console.error("Failed to enable user:", error);
    throw error;
  }
}

/**
 * ユーザーを削除
 */
export async function adminDeleteUser(username: string): Promise<void> {
  try {
    const client = await getCognitoClient();
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

    if (!userPoolId) {
      throw new Error("User Pool IDが設定されていません");
    }

    const command = new AdminDeleteUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });

    await client.send(command);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}

/**
 * ユーザーの属性値を取得するヘルパー関数
 */
export function getUserAttribute(
  user: UserType,
  attributeName: string
): string | undefined {
  return user.Attributes?.find((attr) => attr.Name === attributeName)?.Value;
}
