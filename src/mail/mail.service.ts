import { Inject, Injectable } from '@nestjs/common';
import FromData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from '../common/constants';
import { EmailVariable, MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    to: string,
    template: string,
    variables: EmailVariable[],
  ) {
    const form = new FromData();
    form.append('from', `Nuber Eats <mailgun@${this.options.domain}>`);
    form.append('to', to);
    form.append('subject', subject);
    form.append('template', template);
    variables.forEach(({ key, value }) => form.append(`v:${key}`, value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify your email', email, 'verify-email', [
      { key: 'username', value: email },
      { key: 'code', value: code },
    ]);
  }
}
