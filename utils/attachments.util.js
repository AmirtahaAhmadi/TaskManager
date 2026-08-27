const multer = require("multer");
const path = require("path");

const attachmentsStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now();
    cb(null, uniqueName + ext);
  },
});

const uploader = multer({ storage: attachmentsStorage });
module.exports = { uploader };
