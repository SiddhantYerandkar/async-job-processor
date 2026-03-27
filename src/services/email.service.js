const logger = require("../utils/logger");

const sendEmail = async (data) => {
    logger.info("Sending email to:", data.email);

    // simulate delay
    await new Promise((res) => setTimeout(res, 2000));

    return "Email sent  successfully";
};

module.exports = { sendEmail };