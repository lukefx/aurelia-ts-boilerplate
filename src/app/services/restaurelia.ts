// /*

//  Based on https://github.com/Paldom/angular2-rest
//  (c) Domonkos Pal
//  License: MIT

//  Table of Contents:

//  - class RESTClient

//  - Class Decorators:
//  @BaseUrl(String)
//  @DefaultHeaders(Object)

//  - Method Decorators:
//  @GET(url: String)
//  @POST(url: String)
//  @PUT(url: String)
//  @DELETE(url: String)
//  @Headers(object)
//  @Produces(MediaType)

//  - Parameter Decorators:
//  @Path(string)
//  @Query(string)
//  @Header(string)
//  @Body
//  */

// import { HttpClient } from 'aurelia-fetch-client';
// import { transient, inject } from 'aurelia-dependency-injection';

// /**
//  * RESTClient class.
//  *
//  * @class RESTClient
//  * @constructor
//  */

// @transient()
// @inject(HttpClient)
// export class RESTClient {

// 	public constructor(protected http: HttpClient) {
// 	}

// 	protected getBaseUrl(): string {
// 		return '';
// 	};

// 	protected getDefaultHeaders(): Object {
// 		return {};
// 	};

// 	/**
// 	 * Request Interceptor
// 	 *
// 	 * @method requestInterceptor
// 	 * @param {Request} req - request object
// 	 */
// 	protected requestInterceptor(req: Request): void {
// 		//
// 	}

// 	/**
// 	 * Response Interceptor
// 	 *
// 	 * @method responseInterceptor
// 	 * @param {Response} res - response object
// 	 * @returns {Response} res - transformed response object
// 	 */
// 	protected responseInterceptor(res: Promise<any>): Promise<any> {
// 		return res;
// 	}

// }

// /**
//  * Set the base URL of REST resource
//  * @param {String} url - base URL
//  */
// export function BaseUrl(url: string): <TFunction extends Function>(Target: TFunction) => TFunction {
// 	return function <TFunction extends Function>(Target: TFunction): TFunction {
// 		Target.prototype.getBaseUrl = function (): string {
// 			return url;
// 		};
// 		return Target;
// 	};
// }

// export interface IHeader {
// 	[key: string]: string;
// }

// /**
//  * Set default headers for every method of the RESTClient
//  * @param {Object} headers - deafult headers in a key-value pair
//  */
// export function DefaultHeaders(headers: IHeader): <TFunction extends Function>(Target: TFunction) => TFunction {
// 	return function <TFunction extends Function>(Target: TFunction): TFunction {
// 		Target.prototype.getDefaultHeaders = function (): IHeader {
// 			return headers;
// 		};
// 		return Target;
// 	};
// }

// function paramBuilder(paramName: string): (key: string) =>
// 	(target: RESTClient, propertyKey: string | symbol, parameterIndex: number) => void {
// 	return function (key: string): (target: RESTClient, propertyKey: string | symbol, parameterIndex: number) => void {
// 		return function (target: RESTClient, propertyKey: string | symbol, parameterIndex: number): void {
// 			const metadataKey = `${propertyKey}_${paramName}_parameters`;
// 			const paramObj: any = {
// 				key: key,
// 				parameterIndex: parameterIndex
// 			};
// 			if (Array.isArray(target[metadataKey])) {
// 				target[metadataKey].push(paramObj);
// 			} else {
// 				target[metadataKey] = [paramObj];
// 			}
// 		};
// 	};
// }

// /**
//  * Path variable of a method's url, type: string
//  * @param {string} key - path key to bind value
//  */
// export var Path = paramBuilder('Path');
// /**
//  * Query value of a method's url, type: string
//  * @param {string} key - query key to bind value
//  */
// export var Query = paramBuilder('Query');
// /**
//  * Body of a REST method, type: key-value pair object
//  * Only one body per method!
//  */
// export var Body = paramBuilder('Body')('Body');
// /**
//  * Custom header of a REST method, type: string
//  * @param {string} key - header key to bind value
//  */
// export var Header = paramBuilder('Header');

// /**
//  * Set custom headers for a REST method
//  * @param {Object} headersDef - custom headers in a key-value pair
//  */
// export function Headers(headersDef: IHeader): (target: RESTClient, propertyKey: string, descriptor: any) => any {
// 	return function (target: RESTClient, propertyKey: string, descriptor: any): any {
// 		descriptor.headers = headersDef;
// 		return descriptor;
// 	};
// }

// /**
//  * Defines the media type(s) that the methods can produce
//  * @param MediaType producesDef - mediaType to be parsed
//  */
// export function Produces(producesDef: MediaType): (target: RESTClient, propertyKey: string, descriptor: any) => any {
// 	return function (target: RESTClient, propertyKey: string, descriptor: any): any {
// 		descriptor.isJSON = producesDef === MediaType.JSON;
// 		return descriptor;
// 	};
// }

// /**
//  * Supported @Produces media types
//  */
// export enum MediaType {
// 	JSON
// }

// function methodBuilder(method: RequestMethod): (url: string) => (target: RESTClient, propertyKey: string, descriptor: any) => any {
// 	return function (url: string): (target: RESTClient, propertyKey: string, descriptor: any) => any {
// 		return function (target: RESTClient, propertyKey: string, descriptor: any): any {

// 			const pPath = target[`${propertyKey}_Path_parameters`];
// 			const pQuery = target[`${propertyKey}_Query_parameters`];
// 			const pBody = target[`${propertyKey}_Body_parameters`];
// 			const pHeader = target[`${propertyKey}_Header_parameters`];

// 			descriptor.value = function (...args: any[]): Promise<any> {

// 				// Body
// 				let body = undefined;
// 				if (pBody) {
// 					body = JSON.stringify(args[pBody[0].parameterIndex]);
// 				}

// 				// Path
// 				let resUrl: string = url;
// 				if (pPath) {
// 					for (let k in pPath) {
// 						if (pPath.hasOwnProperty(k)) {
// 							resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
// 						}
// 					}
// 				}

// 				// Query
// 				let search: string;
// 				if (pQuery) {
// 					const queryParameter = [];
// 					pQuery
// 						.filter(p => args[p.parameterIndex]) // filter out optional parameters
// 						.forEach(p => {
// 							let key = p.key;
// 							let value = args[p.parameterIndex];
// 							// if the value is a instance of Object, we stringify it
// 							if (value instanceof Object) {
// 								value = JSON.stringify(value);
// 							}
// 							queryParameter.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
// 						});
// 					search = queryParameter.join('&');
// 				}

// 				// Headers
// 				// set class default headers
// 				const defaultHeaders = this.getDefaultHeaders();
// 				const headers = {};
// 				for (let attr in defaultHeaders) {
// 					if (defaultHeaders.hasOwnProperty(attr)) {
// 						headers[attr] = defaultHeaders[attr];
// 					}
// 				}
// 				// set method specific headers
// 				for (let k in descriptor.headers) {
// 					if (descriptor.headers.hasOwnProperty(k)) {
// 						headers[k] = descriptor.headers[k];
// 					}
// 				}
// 				// set parameter specific headers
// 				if (pHeader) {
// 					for (let k in pHeader) {
// 						if (pHeader.hasOwnProperty(k)) {
// 							headers[pHeader[k].key] = args[pHeader[k].parameterIndex];
// 						}
// 					}
// 				}

// 				const requestInit = {
// 					method: RequestMethod[method],
// 					headers: headers,
// 					body: body
// 				};

// 				const requestUrl = this.getBaseUrl() + resUrl + (search ? `?${search}` : '');

// 				const request = new Request(requestUrl, requestInit);

// 				// intercept the request
// 				this.requestInterceptor(request);

// 				let responsePromise = this.http.fetch(request);

// 				if (descriptor.isJSON) {
// 					responsePromise = responsePromise.then(response => response.json());
// 				}

// 				// intercept the response
// 				return this.responseInterceptor(responsePromise);
// 			};

// 			return descriptor;
// 		};
// 	};
// }

// enum RequestMethod {
//   GET, POST, PUT, DELETE, HEAD
// }

// /**
//  * GET method
//  * @param {string} url - resource url of the method
//  */
// export var GET = methodBuilder(RequestMethod.GET);
// /**
//  * POST method
//  * @param {string} url - resource url of the method
//  */
// export var POST = methodBuilder(RequestMethod.POST);
// /**
//  * PUT method
//  * @param {string} url - resource url of the method
//  */
// export var PUT = methodBuilder(RequestMethod.PUT);
// /**
//  * DELETE method
//  * @param {string} url - resource url of the method
//  */
// export var DELETE = methodBuilder(RequestMethod.DELETE);
// /**
//  * HEAD method
//  * @param {string} url - resource url of the method
//  */
// export var HEAD = methodBuilder(RequestMethod.HEAD);
