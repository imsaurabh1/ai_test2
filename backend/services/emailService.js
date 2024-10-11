//email service file - responsible to send an email

const { sendToolAddedEmail } = require("../utils/emailUtils");

// Send an email after a software is added
const notifyToolAdded = async (userEmail, toolData) => {
  await sendToolAddedEmail(userEmail, toolData);
};

module.exports = {
  notifyToolAdded,
};
