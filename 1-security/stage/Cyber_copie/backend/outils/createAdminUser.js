// /backend/outils/createAdminUser.js

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export default async function createAdminUser() {
  try {
    const existingAdmin = await User.findOne({
      pseudo: process.env.ADMIN_PSEUDO,
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        `${process.env.ADMIN_PASSWORD}`,
        10
      );
      const adminUser = new User({
        name: "admin",
        email: `${process.env.ADMIN_EMAIL}`,
        pseudo: `${process.env.ADMIN_PSEUDO}`,
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log(
        "\x1b[38;5;208m%s\x1b[0m",
        "admin user created. ReadSfile .env pour credentials "
      );
    } else {
      console.log(
        "\x1b[38;5;208m%s\x1b[0m",
        "Read .env file pour admin credentials"
      );
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error creating admin user:", error);
  }
}
