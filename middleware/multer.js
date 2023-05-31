const multer = require("multer");
const uniqid = require("uniqid");

const upload = (DIR, imageType) => {
  const id = uniqid();

  // Multer setup
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase();
      cb(null, `${id}-${fileName}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
    }
  };

  return multer({ storage, fileFilter }).single(imageType);
};

module.exports = upload;
