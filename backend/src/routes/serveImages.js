const { Router } = require("express");
const router = Router();
const path = require("node:path");

//Solicitar imagenes
router.get("/:img", (req, res) => {
  const img = req.params.img;
  const filePath = path.join(__dirname, "..", "..", "static", `${img}`);
  console.log(filePath);
  res.sendFile(filePath);
});

module.exports = router;
