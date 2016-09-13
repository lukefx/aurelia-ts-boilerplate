// import { Logger } from 'aurelia-logging';
// import { inject, LogManager } from 'aurelia-framework';
// import { HttpClient } from 'aurelia-fetch-client';

// import { RESTClient, baseUrl, GET } from './restaurelia';
import { RESTClient, baseUrl, GET, JsonModel } from './restaurelia';
import { User } from './user.model';

@baseUrl('https://api.github.com')
export class UsersService extends RESTClient {

	@JsonModel(User) // the order is important
	@GET('/orgs/w3tecch/public_members')
	public getAll(): Promise<any> { return undefined; };

}
