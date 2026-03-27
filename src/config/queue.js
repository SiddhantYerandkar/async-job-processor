const { Queue } = require("bullmq");
const connection = require("./redis");

const emailQueue = new Queue("emailQueue", { connection });

const reportQueue = new Queue("reportQueue", { connection });

module.exports = { emailQueue, reportQueue };