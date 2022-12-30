const express = require("express");
const router = express.Router();

const controllers = require("../controllers/formController");

//API
router.post("/create", controllers.create);

//traigo todos los forms
router.get("/", controllers.getForms);


//para traer un formulario
router.get("/:id", controllers.getOneForm);

//ruta pra modificar formulario
router.put("/:id", controllers.updateForm);

//ruta para borrar formulario(a probar)
router.delete("/:id", controllers.deleteForm);

module.exports = router;
