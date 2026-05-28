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
    secret: process.env.JWT_SECRET || "default-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || "default-refresh-secret-change-me",
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
