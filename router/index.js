import { app } from "../core/core";
import { findByAge } from "../service/user";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  res.send(await findByAge());
});
