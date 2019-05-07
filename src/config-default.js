const defaultConfig = {
  cors: {
    allowedOrigins: ["*"]
  },
  static: "public",
  storage: "",
  yaml: "",
  routerDir: "",
  database: {
    debug: true,
    dialect: "",
    host: "",
    port: null,
    database: "",
    user: "",
    password: "",
    pool: {
      minSize: 5,
      maxSize: 20,
      connectionLimit: 5
    }
  }
};

module.exports = defaultConfig;
