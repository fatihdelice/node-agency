const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfoySchema = new Schema({
  name: String,
  description: String,
  image: String,
  client: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Portfoy = mongoose.model('Portfoy', PortfoySchema);

module.exports = Portfoy;
