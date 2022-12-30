const Form = require("../models/Form");
const Response = require("../models/Response");

// //create new user
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty" });
  }
  const form = new Form({
    ...req.body,
    responses: null,
    title: req.body.schema.title,
  });
  form
    .save(form)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      })
    );
};

//get all forms
exports.getForms = (req, res) => {
  Form.find()
    .populate("responses")
    .sort({ createdAt: -1 })
    .then((forms) => res.status(200).send(forms))
    .catch((err) => res.status(400).send(err));
};



exports.getOneForm = (req, res) => {
  const _id = req.params.id;
  Form.findById(_id)
    .populate("responses")
    .then((form) => res.status(200).send(form))
    .catch((err) => res.status(400).send(err));
};

exports.updateForm = (req, res) => {
  const _id = req.params.id;
  Form.updateOne({ _id }, req.body)
    .then((form) => {
      res.status(200).send(form);
    })
    .catch((err) => res.status(404).send(err));
};

exports.deleteForm = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  Form.deleteOne({ _id }).then((form) => res.status(200).send(form));
};
