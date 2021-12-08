const { Router, json } = require("express");

const { validateFileUpload } = require("../middlewares");
const { saveImage } = require("../controllers/uploads");

const router = Router();


router.post("/", validateFileUpload, saveImage);

router.get("/",  async (req, res = response) =>{
  res.json({status:"ok"})
});



module.exports = router;
