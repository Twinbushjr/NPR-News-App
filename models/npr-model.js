const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGODB_URI = process.env.MONGODB_URI || ""

mongoose.connect(MONGODB_URI);
mongoose.set('useFindAndModify', false);

const nprSchema = new Schema({
  articleTitle: {
    type: String
  },
  articleSummary: {
    type: String
  },
  urlLink: {
    type: String
  }

});

const nprModel = mongoose.model("NPR", nprSchema);
module.exports = nprModel;