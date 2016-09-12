// import { Logger } from 'aurelia-logging'; //LogManager
import { inject } from 'aurelia-framework';
import { RESTClient, baseUrl } from 'restaurelia';

@baseUrl('https://api.github.com')
export class UsersService extends RESTClient {
	// private log: Logger;

	constructor(a) {
		super(a);
		// this.log = LogManager.getLogger('REST -> Users');
		// this.log.debug('BaseUrl', this.getBaseUrl());
	}

}
