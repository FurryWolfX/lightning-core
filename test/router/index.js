const Lightning = require("../../index");

const app = Lightning.core.getState().app;

app.get("/", (req, res) => res.send("Hello World!"));
