const express = require("express");
const router = express.Router();

const users = require("./users");
const forms = require("./forms");
const responses = require("./responses");

router.use("/users", users);
router.use("/forms", forms);
router.use("/responses", responses);

module.exports = router;
