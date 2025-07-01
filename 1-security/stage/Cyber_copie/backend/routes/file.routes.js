// routes/file.routes.js
// Gestion du téléchargement de contenu

  // routes/course.routes.js
  import express from 'express';
  import { fileDownloadController } from '../controllers/file.controller.js';
  // middleware pour la vérification d'authentification
  import { verifyAuthentification } from '../middleware/authentification.middleware.js';
  
  const router = express.Router();
  
  // ROUTES PRIVES ***********************************************
  // endpoint pour le téléchargement de fichiers
  router.get(
    "/:filename",                // <-- capte le nom de fichier depuis l'URL
    verifyAuthentification,
    fileDownloadController
  );
  // ROUTES PRIVES ***********************************************
  
  export default router;