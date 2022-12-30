const Response = require("../models/Response");
const Form = require("../models/Form");
const email = require("../utils/mailer");

exports.getResponses = (req, res) => {
  Response.find()
    .sort({ createdAt: -1 })
    .then((responses) => res.status(200).send(responses))
    .catch((err) => res.status(400).send(err));
};

exports.create = (req, res) => {
  const response = new Response(req.body);
  response
    .save()
    .then((response) => {
      Form.findById(response.form).then((form) => {
        form.responses
          ? (form.responses = [...form.responses, response._id])
          : (form.responses = [response._id]);
        form.save();
      });
    })
    .then(() => res.sendStatus(200))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      })
    );
};

exports.getResponsesByForm = (req, res) => {
  const form = req.params.form_id;
  Response.find({ form })
    .sort({ createdAt: -1 })
    .then((responses) => res.status(200).send(responses))
    .catch((err) => res.status(400).send(err));
};

exports.getResponseById = (req, res) => {
  Response.findById(req.params._id)
    .populate("form")
    .then((response) => res.send(response))
    .catch((err) => res.status(400).send(err));
};

exports.share = (req, res) => {
  email.response(req.body.email, req.body.formUrl, req.body.formTitle);
};
