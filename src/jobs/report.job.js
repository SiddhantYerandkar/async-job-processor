const { reportQueue } = require("../config/queue");

const addReportJob = async (data) => {
    const job = await reportQueue.add("generateReport", data, {
        priority: 5,
        attempts: 2,
        delay: 5000, // simulate heavy work
    });

    return job;
};

module.exports = { addReportJob };