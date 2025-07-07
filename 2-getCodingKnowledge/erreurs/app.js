// // Serveur web avec Express
// import express from "express";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import path from "path";
// import { engine } from "express-handlebars";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const port = 3000;

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// // app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.render("home", {
//     title: "home",
//   });
// });
// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About",
//     name: "Marcos",
//     age: 52,
//   });
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", { title: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Marcos", age: 52 });
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Erreur, regardez le terminal...");
// });

app.use((req, res) => {
  res.status(404).render("404", { title: "Page non trouvée" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
