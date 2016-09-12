import { LogManager, inject } from 'aurelia-framework'; //lazy
import { Logger } from 'aurelia-logging';
// import { HttpClient } from 'aurelia-fetch-client';
import { UsersService } from '../../services/users.ts';

// polyfill fetch client conditionally
// const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@inject(UsersService)
export class Users {
  public heading: string = 'Github Users';
  public users: Array<IUser> = [];

  private log: Logger;
  // private http: HttpClient;

  //@lazy(Bubu) private getUsersService: () => Bubu
  constructor(private usersService: UsersService) {
    this.log = LogManager.getLogger('Users VM');
  }

  public async activate(): Promise<void> {
    // let url = this.usersService.getBaseUrl();
    // this.log.debug('base-url', url);

    const response = await this.usersService.getAll();
    this.log.info('response', response);
    // this.users = await response.json();

    // // ensure fetch is polyfilled before we create the http client
    // await fetch;
    // const http = this.http = this.getHttpClient();

    // http.configure(config => {
    //   config
    //     .useStandardConfiguration()
    //     .withBaseUrl('https://api.github.com/');
    // });

    // const response = await http.fetch('orgs/w3tecch/public_members');
    // this.users = await response.json();
  }
}
