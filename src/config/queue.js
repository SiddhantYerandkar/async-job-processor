const { Queue } = require("bullmq");
const connection = require("./redis");

const emailQueue = new Queue("emailQueue", { connection });

module.exports = { emailQueue };