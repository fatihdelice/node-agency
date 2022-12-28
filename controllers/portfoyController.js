const Portfoy = require("../models/Portfoy");
const fs = require("fs");

exports.getAllPortfoy = async (req, res) => {
  try {
    const portfoys = await Portfoy.find({}).sort("-dateCreated").limit(2);

    res.render("index", {
      portfoys: portfoys,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.createPortfoy = async (req, res) => {
  try {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
      await Portfoy.create({
        name: req.body.name,
        description: req.body.description,
        client: req.body.client,
        category: req.body.category,
        image: "/uploads/" + uploadedImage.name,
      });
      res.redirect("/");
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updatePortfoy = async (req, res) => {
  const portfoy = await Portfoy.findOne({ _id: req.params.id });
  portfoy.name = req.body.name;
  portfoy.description = req.body.description;
  portfoy.client = req.body.client;
  portfoy.category = req.body.category;
  portfoy.save();
  res.redirect('/');
};

exports.deletePortfoy = async (req, res) => {
  const portfoy = await Portfoy.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + portfoy.image;
  fs.unlinkSync(deletedImage);
  await Portfoy.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
