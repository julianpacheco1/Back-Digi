const express = require("express");
const router = express.Router();

const controllers = require("../controllers/userController");

//API
router.post("/create", controllers.create);

//all users
router.get("/", controllers.getUsers);

//RAUTA PARA LOGIN
router.post("/login", controllers.loginUsers);

//RUTA PARA LOGOUT
router.get("/logout", controllers.logoutUsers);

//traer un usuario
router.get("/:id", controllers.getOneUser);

//para modificar usuario
router.put("/:id", controllers.updateUser);

//para borrar usuario
router.delete("/:id", controllers.deleteUser);

// confirmar la creacion del usuario
router.post("/confirm/:confirmCode", controllers.confirm);

module.exports = router;
