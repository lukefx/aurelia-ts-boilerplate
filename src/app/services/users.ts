import { Logger } from 'aurelia-logging';
import { LogManager, singleton } from 'aurelia-framework';
import { RESTClient, BaseUrl } from 'restaurelia';

@singleton
@BaseUrl('https://api.github.com/')
export class UsersService extends RESTClient {

	private log: Logger;

	constructor() {
		super();
		this.log = LogManager.getLogger('REST -> Users');
		this.log.debug('BaseUrl', this.getBaseUrl());
	}

}

// @BaseUrl('http://api.w3tec.ch')
// export class Users extends RESTClient {

// 	private log: Logger;

// 	constructor() {
// 		super();
// 		this.log = LogManager.getLogger('REST -> Users');
// 		this.log.debug('BaseUrl', this.getBaseUrl());
// 	}

// }
