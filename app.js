const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const ejs = require("ejs");
const portfoyController = require("./controllers/portfoyController");

const app = express();

// connect DB
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost/agency-db");

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/", portfoyController.getAllPortfoy);
app.post("/portfoy", portfoyController.createPortfoy);
app.put('/portfoy/:id', portfoyController.updatePortfoy);
app.delete('/portfoy/:id', portfoyController.deletePortfoy);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
