import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSRモードを明示的に指定（Amplifyでのビルドエラーを防ぐ）
  output: "standalone",

  experimental: {
    // Optimize for better performance
    optimizePackageImports: ["@openai/agents"],
    webVitalsAttribution: ["CLS", "LCP"],
  },

  // Cross Origin Headers for AWS Amplify
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "*" // Amplifyブランチドメインを許可するため変更
                : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Language, Authorization, Content-Language, Content-Type, Origin, Referer, User-Agent, X-Requested-With, X-CSRF-Token, X-Custom-Header",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "*" // Amplifyブランチドメインを許可するため変更
                : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Language, Authorization, Content-Language, Content-Type, Origin, Referer, User-Agent, X-Requested-With, X-CSRF-Token, X-Custom-Header",
          },
        ],
      },
    ];
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Webpack configuration to handle ESM dependencies
  webpack: (config, { dev, isServer }) => {
    // Handle ESM modules
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".jsx": [".jsx", ".tsx"],
    };

    // Allow importing .mjs files
    config.resolve.extensions.push(".mjs");

    // Configure externals for client-side bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Transpile ESM dependencies
  transpilePackages: [
    "@modelcontextprotocol/sdk",
    "@openai/agents",
    "@openai/agents-core",
    "@openai/agents-realtime",
  ],
};

export default nextConfig;
