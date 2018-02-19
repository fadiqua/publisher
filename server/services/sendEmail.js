import nodemailer from 'nodemailer';
import nodemailerSmtpTransport from 'nodemailer-smtp-transport';
import nodemailerDirectTransport from 'nodemailer-direct-transport';

let nodemailerTransport = nodemailerDirectTransport();
if (process.env.EMAIL_SERVER && process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
  nodemailerTransport = nodemailerSmtpTransport({
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_PORT || 25,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}


export function verificationEmail(url) {
  nodemailer
    .createTransport(nodemailerTransport)
    .sendMail({
      to: 'fadi.quader@gmail.com',
      from: process.env.EMAIL_FROM,
      subject: 'Sign in link',
      text: `Use the link below to sign in:\n\n${url}\n\n`,
      html: `<p>Use the link below to sign in:</p><p>${url}</p>`,
    }, (err) => {
      if (err) {
        console.error(`Error sending email to ${''}`, err);
      }
    });
}

export function forgetPasswordEmail(url) {
  nodemailer
    .createTransport(nodemailerTransport)
    .sendMail({
      to: 'fadi.quader@gmail.com',
      from: process.env.EMAIL_FROM,
      subject: 'Forget password',
      text: `Use the link below to to restore password:\n\n${url}\n\n`,
      html: `<p>Use the link below to restore password:</p><p>${url}</p>`,
    }, (err) => {
      if (err) {
        console.error(`Error sending email to ${''}`, err);
      }
    });
}
