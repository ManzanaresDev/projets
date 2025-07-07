// backend/routes/auth.routes.js

import express from "express";
import { refreshTokenController } from "../controllers/authController.js";
import { verifyAuthentification } from "../middleware/authentification.middleware.js";

const router = express.Router();

router.post("/refresh", refreshTokenController);

export default router;
