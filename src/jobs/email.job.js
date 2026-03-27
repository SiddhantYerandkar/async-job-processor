const { emailQueue } = require("../config/queue");

const addEmailJob = async (data) => {
    const job = await emailQueue.add("sendEmail", data, {
        priority: 1,
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },
    });

    return job
};

module.exports = { addEmailJob };