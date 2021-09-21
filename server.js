import express from "express";
import fetch from "node-fetch";
import path, { join } from "path";
var __dirname = path.resolve();
import ejs from "ejs";
const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log("servers is running");
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "public")));

app.get("/", function (req, res, next) {
  console.log("Hej");
  res.render("index", { title: "App" });
});

app.get(`/:website`, async (req, res) => {
  try {
    const response = await fetch(`https://www.${req.params.website}.com/`);
    const data = await response.text();
    console.log(data);
    res.render("website", { data: data });
  } catch (error) {
    if (error) console.log(error);
  }
});
