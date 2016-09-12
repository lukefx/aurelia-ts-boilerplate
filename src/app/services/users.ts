// import { Logger } from 'aurelia-logging';
// import { LogManager } from 'aurelia-framework';
import { RESTClient, BaseUrl } from 'restaurelia';

@BaseUrl('https://api.github.com')
export class UsersService extends RESTClient {
	// private log: Logger;

	constructor() {
		super();
		// this.log = LogManager.getLogger('REST -> Users');
		// this.log.debug('BaseUrl', this.getBaseUrl());
	}

	public say(): void {
		alert('say hi');
	}
}
