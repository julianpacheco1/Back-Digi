const express = require("express");
const router = express.Router();

const controllers = require("../controllers/responseController.js");

// devuelve todas las respuestas de todos los formularios
router.get("/", controllers.getResponses);

// guarda una respuesta en un la base de datos
router.post("/create", controllers.create);

// devuelve todas las respuestas de un formulario
router.get("/forms/:form_id", controllers.getResponsesByForm);

//devuelve una respuesta por id
router.get("/:_id", controllers.getResponseById);

router.put("/share", controllers.share);

module.exports = router;
