import nodemailer from 'nodemailer';

const sendResetEmail = async (email: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Link',
    text: `To reset your password, click on the following link: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to ' + email);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

export default sendResetEmail;
