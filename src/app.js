const express = require("express");
const jobRoutes = require("./routes/job.routes");
const { serverAdapter } = require("./config/bullBoard");
const { apiLimiter } = require("./middlewares/rateLimiter");

const app = express();

app.use(express.json());

app.use(apiLimiter)

app.use("/jobs", jobRoutes);

app.use("/admin/queues", serverAdapter.getRouter());

module.exports = app;