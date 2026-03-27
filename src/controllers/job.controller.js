const { emailQueue } = require("../config/queue");
const { addEmailJob } = require("../jobs/email.job");
const { addReportJob } = require("../jobs/report.job");

const createEmailJob = async (req, res) => {
    const { email } = req.body;

    const job = await addEmailJob({ email });

    res.json({ message: "Job added to queue", jobId: job.id });
};

const getJobStatus = async (req, res) => {
    const { id } = req.params;

    const job = await emailQueue.getJob(id);

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    const state = await job.getState();

    res.json({
        id: job.id,
        status: state,
        data: job.data,
        attemptsMade: job.attemptsMade,
        failedReason: job.failedReason || null,
        result: job.returnvalue || null,
    });
};


const createReportJob = async (req, res) => {
    const { userId } = req.body;

    const job = await addReportJob({ userId });

    res.json({
        message: "Report job added",
        jobId: job.id,
    });
};

module.exports = { createEmailJob, getJobStatus, createReportJob };
