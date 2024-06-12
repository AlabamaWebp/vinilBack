import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as dotenv from 'dotenv';
dotenv.config();

export const getMailConfig = async (
): Promise<any> => {
  
  const transport = `smtps://${process.env.login}:${process.env.password}@smtp.yandex.ru`
  const mailFromName = "«Импрессия»"
  const mailFromAddress = transport.split(':')[1].split('//')[1];
  return {
    transport,
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
