var User = require("../models/User");
var bcrypt = require("bcrypt");


exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw Error("Usuario no encontrado");
  const validate = await user.validatePassword(password);
  if (!validate) throw Error("Contraseña incorrecta");
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    confirm: user.confirm,
  };
};
