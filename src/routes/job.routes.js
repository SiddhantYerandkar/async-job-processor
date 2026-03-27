const express = require("express");
const { createEmailJob } = require("../controllers/job.controller");

const router = express.Router();

router.post("/email", createEmailJob);

module.exports = router;