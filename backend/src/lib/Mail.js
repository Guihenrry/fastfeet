import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expresshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import MailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = MailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: expresshbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        extName: '.hbs',
        viewPath,
      })
    );
  }

  sendMail(message) {
    this.transporter.sendMail({
      ...MailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
