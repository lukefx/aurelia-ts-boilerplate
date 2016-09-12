// import { Logger } from 'aurelia-logging';
// import { inject, LogManager } from 'aurelia-framework';
// import { HttpClient } from 'aurelia-fetch-client';
import { RESTClient, baseUrl, GET } from 'restaurelia';
// import { RESTClient, BaseUrl, GET } from './restaurelia';

@baseUrl('https://api.github.com')
export class UsersService extends RESTClient {

	@GET('/orgs/w3tecch/public_members')
	public getAll(): Promise<any> { return undefined; };

}
