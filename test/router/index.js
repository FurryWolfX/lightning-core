const Lightning = require("../../dist").default;

const state = Lightning.core.getState();
const app = state.app;

app.get("/", (req, res) => res.send("Hello World!"));

console.log(state);
