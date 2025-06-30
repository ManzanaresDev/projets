// mongo/app.js
import { connectDB } from "./src/services/mongoose.service.js";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./src/routers/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB().catch((err) => console.error(err));

app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`server running à http://localhost:${port} !`);
});
