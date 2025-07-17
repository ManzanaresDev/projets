import multer from "multer";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Simuler __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Création du storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `../../${process.env.UPLOADS_PATH}`));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); // garde l'extension .pdf
    const randomFileName = crypto.randomBytes(32).toString("hex");
    cb(null, `${randomFileName}${extension}`);
  },
});

// Fichier accepté uniquement s’il est un fichier PDF
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are authorized"), false);
  }
};

// Configuration complète de Multer
export const configurationStorage = () =>
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        parseInt(process.env.UPLOAD_MAX_FILESIZE || "10", 10) * 1024 * 1024, // max 10 MB par défaut
    },
  });
