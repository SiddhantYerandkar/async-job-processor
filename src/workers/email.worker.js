const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { sendEmail } = require("../services/email.service");

const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log("Processing job:", job.id);
        await sendEmail(job.data);
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
});