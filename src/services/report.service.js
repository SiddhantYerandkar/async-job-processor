const generateReport = async (data) => {
    console.log("Generating report for:", data.userId);

    // simulate heavy processing
    await new Promise((res) => setTimeout(res, 4000));

    return {
        message: "Report generated",
        reportId: Date.now(),
    };
};

module.exports = { generateReport };