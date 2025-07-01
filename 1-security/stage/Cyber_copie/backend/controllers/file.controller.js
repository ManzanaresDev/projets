// controller/file.controller.js

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fileDownloadController = async (req, res) => {
  try {
    
    if (!req.params.filename) {
      return res.status(400).json({ error: 'Nom de fichier requis' });
    };
    
    const fileName = req.params.filename;
    const uploadDir = process.env.UPLOADS_PATH || 'uploads';
    const filePath = path.join(__dirname, '../..', uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'file not found' });
    };

    res.download(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'server error' });
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'server error' });
  };
};