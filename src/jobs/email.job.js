const { emailQueue } = require("../config/queue");

const addEmailJob = async (data) => {
    await emailQueue.add("sendEmail", data, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },
    });
};

module.exports = { addEmailJob };