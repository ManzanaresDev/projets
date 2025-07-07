// Serveur web avec Express
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { engine } from "express-handlebars";
import { weather } from "./public/utils/weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", {
    title: "home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Marcos",
    age: 52,
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.send("Veuillez fournir une location dans la query string.");
  }

  weather(location, "m", (err, data) => {
    if (err) {
      res.send(`Une erreur s'est produite : ${err}`);
    } else {
      res.send(data); // `data` est le message string défini dans weather.js
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
