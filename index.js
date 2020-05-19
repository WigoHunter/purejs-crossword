const express = require("express");
const path = require("path");
const reload = require("reload");

const app = express();
const port = 3000;

app.use("/scripts", express.static("scripts"));
app.get("/", (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)));
app.listen(port, console.log(`App starting at http://localhost:${port}`));

reload(app);
