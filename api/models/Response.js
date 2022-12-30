const mongoose = require("mongoose");

var responseSchema = new mongoose.Schema(
  {
    // ID del formulario al que corresponde
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      required: true,
    },
    // ID del usuario al que correspondes
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // Las respuestas al formulario
    formData: {
      type: Object,
    },
  },
  { timestamps: true, versionKey: false }
);

const Response = mongoose.model("responses", responseSchema);

module.exports = Response;
