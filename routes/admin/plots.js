const express = require('express');
const router = express.Router();
const plotsController = require("../../controllers/admin/plots.controller");

router.get("/",plotsController.index);

module.exports=  router