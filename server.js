import express from "express";
import fetch from "node-fetch";
import path, { join } from "path";
import cors from "cors";
const __dirname = path.resolve();
import ejs from "ejs";
const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log("server is running");
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.static(join(__dirname, "/public")));

app.get("/", function (req, res, next) {
  res.render("index", { title: "Website capture" });
});

app.get(`/:website`, async (req, res) => {
  try {
    const response = await fetch(`https://www.${req.params.website}.com/`);
    const data = await response.text();
    res.render("website", { data: data });
  } catch (error) {
    if (error) console.log(error);
  }
});
