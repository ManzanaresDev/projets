// backend/middleware/isAdmin.js

import { userExists } from "../outils/user.outils.js";
function isAdmin(req, res, next) {
try {
    // 1. Récupérer le token depuis le cookie
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        ok: false,
        message: "Access token required  (absent cookie)",
      });
    }

    // 2. Vérifier le token
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ ok: false, message: "Expired token" });
      }
      return res.status(403).json({ ok: false, message: "Invalid token" });
    }

    // 3. Vérifier que l'utilisateur existe
    const user = await userExists("_id", decodedToken._id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "unknown user",
      });
    }
    // 4. Vérifier les droits d'accès
  if (user.role !== "admin") {
    return res.status(403).json({ ok: false, message: "access not granted" });
  }

  // 5. Attacher l'utilisateur et le token à la requête
  req.user = user;
  req.authToken = accessToken;

  // 6. Suite...
  next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "token verification error",
      error: err.message,
    });
  }
}
