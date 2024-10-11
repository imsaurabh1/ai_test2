//Email Utility file

const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "info.aiplanning.software@gmail.com",
    pass: "gtgckkxwyxefotsf", 
  },
});

const adminEmail = "saurabh.uni.stuttgart@gmail.com";

// Function to format the software details into an HTML table
const formatToolDetailsAsTable = (toolDetails) => {
  let tableRows = "";

  for (const [key, value] of Object.entries(toolDetails)) {
    tableRows += `<tr>
                    <td style="padding: 5px; border: 1px solid #ddd;">${key}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${
                      value || "N/A"
                    }</td>
                  </tr>`;
  }

  return `<table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd;">Field</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Details</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>`;
};

// Function to send the email when a new tool is added
const sendToolAddedEmail = async (userEmail, toolDetails, toolId) => {

  // Format the tool details as a table
  const toolDetailsTable = formatToolDetailsAsTable(toolDetails);

  // Email body content
  const mailOptions = {
    from: "info.aiplanning.software@gmail.com",
    to: adminEmail,
    subject: "AI Planning Software | New Software Info Added",
    html: `
      <p>Hi AI Planning Team,</p>
      <p>This is to inform you that a new AI Planning Software information has been added to the database.</p>
      <p><strong>Software ID:</strong> ${toolId}</p>
      <p>Following are the details:</p>
      ${toolDetailsTable}
      <p>Thanks,</p>
      <p>AI Planning Support Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendToolAddedEmail,
};
