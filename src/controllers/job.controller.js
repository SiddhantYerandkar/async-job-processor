const { addEmailJob } = require("../jobs/email.job");

const createEmailJob = async (req, res) => {
    const { email } = req.body;

    await addEmailJob({ email });

    res.json({ message: "Job added to queue" });
};

module.exports = { createEmailJob };