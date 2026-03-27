const express = require("express");
const { createEmailJob, getJobStatus, createReportJob } = require("../controllers/job.controller");

const router = express.Router();

router.post("/email", createEmailJob);

router.get("/:id", getJobStatus);

router.post("/report", createReportJob);

module.exports = router;