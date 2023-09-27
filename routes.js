const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const { page, total } = req.query;
  res.send({
    status: "succesfully",
    message: "Welcome to Express JS from routes.js",
    page,
    total,
  });
});

router.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

router.get("/product/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post("/product/", upload.single("image"), (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "uploads", image.originalname);
    fs.renameSync(image.path, target);
    res.json({
      name,
      price,
      stock,
      image,
    });
  }
  res.sendFile(target);
});

router.get("/:category/:tag", (req, res) => {
  const { category, tag } = req.params;
  res.json({
    category: category,
    tag: tag,
  });
});

module.exports = router;
