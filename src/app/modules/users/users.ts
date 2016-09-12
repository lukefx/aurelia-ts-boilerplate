import { lazy, LogManager } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { HttpClient } from 'aurelia-fetch-client';
import { UsersService } from '../../services/users.ts';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

export class Users {
  public heading: string = 'Github Users';
  public users: Array<IUser> = [];

  private log: Logger;
  private http: HttpClient;

  constructor( @lazy(HttpClient) private getHttpClient: () => HttpClient,
               @lazy(UsersService) private getUsersService: () => UsersService) {
    this.log = LogManager.getLogger('Users VM');
  }

  public async activate(): Promise<void> {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    const response = await http.fetch('orgs/w3tecch/public_members');
    this.users = await response.json();
  }
}
