import { JsonProperty } from 'json-typescript-mapper';

export class User {

	@JsonProperty('id')
	public id: number;

	@JsonProperty('login')
	public login: string;

}
