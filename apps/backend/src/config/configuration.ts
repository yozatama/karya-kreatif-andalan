function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_SECRET environment variable is required in production",
      );
    }
    console.warn(
      "[WARN] JWT_SECRET not set. Using dev-only fallback. Do NOT use in production.",
    );
    return "dev-only-jwt-secret-not-for-production";
  }
  return secret;
}

function getJwtRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_REFRESH_SECRET environment variable is required in production",
      );
    }
    console.warn(
      "[WARN] JWT_REFRESH_SECRET not set. Using dev-only fallback. Do NOT use in production.",
    );
    return "dev-only-jwt-refresh-secret-not-for-production";
  }
  return secret;
}

export default () => ({
  app: {
    port: parseInt(process.env.PORT || "4000", 10),
    cors: {
      origins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"],
    },
  },
  database: {
    url: process.env.DATABASE_URL || "",
  },
  jwt: {
    secret: getJwtSecret(),
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    refreshSecret: getJwtRefreshSecret(),
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER || "local",
    bucket: process.env.STORAGE_BUCKET || "",
    region: process.env.STORAGE_REGION || "",
    accessKey: process.env.STORAGE_ACCESS_KEY || "",
    secretKey: process.env.STORAGE_SECRET_KEY || "",
    endpoint: process.env.STORAGE_ENDPOINT || "",
  },
  payment: {
    xenditSecretKey: process.env.XENDIT_SECRET_KEY || "",
    xenditCallbackToken: process.env.XENDIT_CALLBACK_TOKEN || "",
  },
});
