import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '@src/common/constants';
import FromData from 'form-data';
import got from 'got';
import { MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(subject: string, content: string) {
    const form = new FromData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `dev.jinyongp@gmail.com`);
    form.append('subject', subject);
    form.append('text', content);
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
  }
}
