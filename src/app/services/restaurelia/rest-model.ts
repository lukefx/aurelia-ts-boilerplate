import { RESTClient } from './rest-client';
import { deserialize } from 'json-typescript-mapper';

/**
 * mapJsonToModel
 */
const mapJsonToModel = (
	target: RESTClient,
	propertyKey: string | symbol,
	descriptor: TypedPropertyDescriptor<Function>,
	modelClass: { new (): any }): void => {
		const currentMethod = descriptor.value;
		descriptor.value = function (...args: any[]): Promise<any> {
		let responsePromise: Promise<Response> = currentMethod.apply(this, args);
		console.error('responsePromise', responsePromise);
		if (modelClass) {
			responsePromise = responsePromise.then(response => response.json())
				.then(json => {
					console.log('json', json);
					if (Array.isArray(json)) {
						json = json.map(jsonItem => deserialize(modelClass, jsonItem));
					} else {
						json = deserialize(modelClass, json);
					}
					console.log('json', json);
					return json;
				});
		}

		return responsePromise;
		};

};

/**
 * JsonModel
 *
 * @export
 * @param {{ new (): any }} modelClass
 * @returns {(...args: any[]) => void}
 */
export function JsonModel(modelClass: { new (): any }): (...args: any[]) => void {
	return (...args): void => {
		args.push(modelClass);
		return mapJsonToModel.apply(this, args);
	};
}
