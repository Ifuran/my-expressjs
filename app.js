const express = require("express");
const app = express();
const router = require("./routes");
const log = require("./middleware/logger");
const path = require("path");

app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/gambar", express.static(path.join(__dirname, "uploads")));
app.use(router);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: `Resources ${req.originalUrl} not Found broo.`,
  });
});
app.listen(3000, () => console.log("Server: http://localhost:3000"));
