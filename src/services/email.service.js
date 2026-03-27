const sendEmail = async (data) => {
    console.log("Sending email to:", data.email);

    // simulate delay
    await new Promise((res) => setTimeout(res, 2000));

    console.log("Email sent!");
};

module.exports = { sendEmail };