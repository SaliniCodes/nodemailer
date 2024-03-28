
const Nodemailer = require("nodemailer");
const mailer = require("../Model/usermail");
const dotenv = require("dotenv");
dotenv.config();

const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
console.log("check**********", Math.random());

function generateOTP() {
    return Math.round(Math.random() * 10000+2500).toString()
}

console.log(generateOTP());

const signup = async (req, res) => {
    const email = req.body.email;
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    console.log(
        otp,
        otpExpiration,
        email
    );
    try {
    const user = new mailer({
        email,
        otp,
        otpExpiration
    });


      await user.save();
  
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP code",
        html: `<p>Your OTP code is shown below:</p><p>${otp}</p><img src="cid:unique@nodemailer.com"/>`,
        attachments: [{
            filename: 'timeouut.png',
            path: 'C:/Users/User/Pictures/Screenshots/timeouut.png', // Update the path to your image file
            cid: 'unique@nodemailer.com' // same cid value as in the html img src
        }]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Failed to send OTP email" });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: "OTP sent successfully" });
        }
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred while saving user data" });
}
};


module.exports={signup}