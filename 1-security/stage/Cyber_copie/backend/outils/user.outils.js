//  outils/user.outils.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { hasher } from "./token.outils.js";

export async function userExists(field, valeur) {
  return await User.findOne({ [field]: valeur });
}

export async function comparerPassword(p1, p2) {
  return await bcrypt.compare(p1, p2);
}

export function userIsAdmin(role) {
  return role === "admin";
}

export async function saveUser(user) {
  return await User.create(user);
}

/**
 * Met à jour un utilisateur :
 * - hash du mot de passe si newPassword fourni
 * - $set : champs à mettre à jour
 * - $unset : champs à supprimer
 */
export async function updateUser(
  field, // clé de recherche (ex: "email", "id")
  value, // valeur de cette clé
  newPassword = null, // nouveau mot de passe (optionnel)
  fieldsToUnset = {}, // champs à supprimer (ex: { resetToken: true })
  fieldsToUpdate = {} // champs à mettre à jour (ex: { lastLogin: Date.now() })
) {
  const update = {};

  // Hasher et mettre à jour le mot de passe si fourni
  if (newPassword) {
    const hashedPassword = await hasher(newPassword);
    update.$set = { ...(update.$set || {}), password: hashedPassword };
  }

  // Ajouter d'autres champs à mettre à jour
  if (Object.keys(fieldsToUpdate).length > 0) {
    update.$set = { ...(update.$set || {}), ...fieldsToUpdate };
  }

  // Ajouter les champs à supprimer
  if (Object.keys(fieldsToUnset).length > 0) {
    update.$unset = {};
    for (const key of Object.keys(fieldsToUnset)) {
      update.$unset[key] = "";
    }
  }

  // Lancer la mise à jour
  return await User.updateOne({ [field]: value }, update);
}

export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch {
    return [];
  }
}
