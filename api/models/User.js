const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
// SALT_WORK_FACTOR = 10

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
    },
  ],
  confirm: {
    type: Boolean,
    default: false,
  },
  confirmCode: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  //only hash the password if its has been modified (or is new)
  //     if (!user.isModified("password")) return next();

  //     //generate a salt
  //     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
  //         if (err) return next (err);

  //         //hash the password using our new salt
  //         bcrypt.hash(user.password, salt, function (err, hash){
  //             if (err) return next(err);

  //             //override the cleartext password with the hashed one
  //             user.password = hash;
  //             next();

  //     });
  // });

  //antes de crear el usuario
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

//METODOS DE INSTANCIA
userSchema.methods.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return this.hash(password, this.salt).then(
    (newHash) => newHash === this.password
  );
};

const User = mongoose.model("users", userSchema);

//                             | nombre del documento

module.exports = User;
