const nodemailer = require("nodemailer")
const CustomErrorHandler = require("../error/error")

async function sendEmail(email, code) {
  try {
    const testAccount = await nodemailer.createTestAccount()
    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
    
    const info = await transporter.sendMail({
      subject: "DevBook",
      from: "dianavafoyeva220@gmail.com",
      to: email,
      html: `<b style="color: blue; font-size: 36px;">${code}</b>`
    })
    
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info))
  } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message)
  }
}

module.exports = sendEmail