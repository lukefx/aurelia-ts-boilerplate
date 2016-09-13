import { RESTClient, IHeader } from './rest-client';

/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function headers(headersDef: IHeader): (target: RESTClient, propertyKey: string, descriptor: any) => any {
  return function (target: RESTClient, propertyKey: string, descriptor: any): any {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

/**
 * Defines the media type(s) that the methods can produce
 * @param MediaType producesDef - mediaType to be parsed
 */
export function produces(producesDef: MediaType): (target: RESTClient, propertyKey: string, descriptor: any) => any {
  return function (target: RESTClient, propertyKey: string, descriptor: any): any {
    descriptor.isJSON = producesDef === MediaType.JSON;
    return descriptor;
  };
}

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON
}

function methodBuilder(method: RequestMethod): (url: string) => (target: RESTClient, propertyKey: string, descriptor: any) => any {
  return function (url: string): (target: RESTClient, propertyKey: string, descriptor: any) => any {
    return function (target: RESTClient, propertyKey: string, descriptor: any): any {

      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function (...args: any[]): Promise<any> {

        // Body
        let body = undefined;
        if (pBody) {
          body = JSON.stringify(args[pBody[0].parameterIndex]);
        }

        // Path
        let resUrl: string = url;
        if (pPath) {
          for (let k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
            }
          }
        }

        // Query
        let search: string;
        if (pQuery) {
          const queryParameter = [];
          pQuery
            .filter(p => args[p.parameterIndex]) // filter out optional parameters
            .forEach(p => {
              let key = p.key;
              let value = args[p.parameterIndex];
              // if the value is a instance of Object, we stringify it
              if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              queryParameter.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            });
          search = queryParameter.join('&');
        }

        // Headers
        // set class default headers
        const defaultHeaders = this.getDefaultHeaders();
        const headers = {};
        for (let attr in defaultHeaders) {
          if (defaultHeaders.hasOwnProperty(attr)) {
            headers[attr] = defaultHeaders[attr];
          }
        }
        // set method specific headers
        for (let k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            headers[k] = descriptor.headers[k];
          }
        }
        // set parameter specific headers
        if (pHeader) {
          for (let k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers[pHeader[k].key] = args[pHeader[k].parameterIndex];
            }
          }
        }

        const requestInit = {
          method: RequestMethod[method],
          headers: headers,
          body: body
        };

        const requestUrl = this.getBaseUrl() + resUrl + (search ? `?${search}` : '');

        const request = new Request(requestUrl, requestInit);

        // intercept the request
        this.requestInterceptor(request);

        let responsePromise = this.http.fetch(request);

        if (descriptor.isJSON) {
          responsePromise = responsePromise.then(response => response.json());
        }

        // intercept the response
        responsePromise = this.responseInterceptor(responsePromise);
        console.info('responsePromise', responsePromise);

        return responsePromise;
      };

      return descriptor;
    };
  };
}

enum RequestMethod {
  GET, POST, PUT, DELETE, HEAD
}

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export var GET = methodBuilder(RequestMethod.GET);
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export var POST = methodBuilder(RequestMethod.POST);
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export var PUT = methodBuilder(RequestMethod.PUT);
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export var DELETE = methodBuilder(RequestMethod.DELETE);
/**
 * HEAD method
 * @param {string} url - resource url of the method
 */
export var HEAD = methodBuilder(RequestMethod.HEAD);
