const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { generateReport } = require("../services/report.service");

const worker = new Worker(
    "reportQueue",
    async (job) => {
        console.log("Processing report job:", job.id);

        const result = await generateReport(job.data);
        return result;
    },
    { connection, concurrency: 2 }
);

worker.on("completed", (job) => {
    console.log(`Report job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Report job ${job.id} failed:`, err.message);
});