const Lightning = require("../../dist");

const app = Lightning.core.getState().app;

app.get("/", (req, res) => res.send("Hello World!"));
