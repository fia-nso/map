const router = require("express").Router();
const ListControllers = require("../controllers/Listting");
const filtrer = require("../controllers/userListting");
//const multer = require("multer");
//const upload = multer();
router.post("/create", ListControllers.createListing);
router.delete("/:id", ListControllers.deleteList);
router.post("/:id", ListControllers.updateList);
router.put("/filtrer", filtrer.filtrer);
router.get("/", filtrer.All);
//router.post('/api/upload', upload.single("file"), filtrer.uploadProfil);

module.exports = router;
