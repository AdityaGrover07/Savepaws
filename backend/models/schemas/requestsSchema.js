const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  PetID: {
    type: String,
    required: true,
  },
  Requests: [String],
  /**
   * False - Till the request is pending
   */
  Status: {
    type: Boolean,
    default: false,
  },
  /**
   * Once User gets rejected he can not request the same pet again
   */
  //   Rejected: [String],
});

const Requests = mongoose.model("Request", RequestSchema);
module.exports = { Requests };
