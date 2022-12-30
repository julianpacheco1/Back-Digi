var User = require("../models/User");
const { generateToken } = require("../config/tokens");
const userService = require("../services/userService");
const mailer = require("../utils/mailer");

// //create new user
exports.create = (req, res) => {
  //validate
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty" });
  }
  const { name, email, password } = req.body;
  const confirmCode = Math.floor(Math.random() * 1000000000000);
  //new user
  const user = new User({
    name,
    email,
    password,
    confirmCode,
  });

  //save user in dataBase
  user
    .save()
    .then((data) => {
      console.log(data);
      //mandar email de confirmacion
      mailer.confirm(
        data.email,
        data.name,
        `http://localhost:3000/confirm/${data.confirmCode}`
      );
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      })
    );
};

//get all users
exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

//traer un usuario por id
exports.getOneUser = (req, res) => {
  const id = req.params.id;
  User.findOne({ id }).then((user) => res.status(200).send(user));
};

//logIn user
exports.loginUsers = async (req, res) => {
  const { email, password } = req.body;
  userService
    .login(email, password)
    .then((payload) => {
      res.send(payload);
    })
    .catch((err) => res.status(401).send(String(err)));
};

//logOut user
exports.logoutUsers = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

//Modificar usuario
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.updateOne({ id }, body)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => res.sendStatus(404));
};

//borrar usuario
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ id }).then((user) => res.status(200).send(user));
};

//Envía el email de confirmación
exports.confirm = (req, res) => {
  const confirmCode = req.params.confirmCode;
  User.updateOne({ confirmCode }, { confirm: true })
    .then(() => {
      res.send(true);
    })
    .catch((error) => res.sendStatus(404));
};
