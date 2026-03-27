const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { sendEmail } = require("../services/email.service");
const logger = require("../utils/logger");

const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log("Processing job:", job.id);
        const result = await sendEmail(job.data);
        return result;
    },
    { connection, concurrency: 5 }
);

worker.on("completed", (job) => {
    logger.info(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    logger.error(`Job ${job.id} failed:`, err.message);
});