import { HttpClient } from 'aurelia-fetch-client';
import { transient, inject } from 'aurelia-dependency-injection';

/**
 * RESTClient class.
 *
 * @class RESTClient
 * @constructor
 */

@transient()
@inject(HttpClient)
export class RESTClient {

  public constructor(protected http: HttpClient) {
  }

  protected getBaseUrl(): string {
    return '';
  };

  protected getDefaultHeaders(): Object {
    return {};
  };

  /**
   * Request Interceptor
   *
   * @method requestInterceptor
   * @param {Request} req - request object
   */
  protected requestInterceptor(req: Request): void {
    //
  }

  /**
   * Response Interceptor
   *
   * @method responseInterceptor
   * @param {Response} res - response object
   * @returns {Response} res - transformed response object
   */
  protected responseInterceptor(res: Promise<any>): Promise<any> {
    console.info('responseInterceptor', res);
    return res;
  }

}

/**
 * Set the base URL of REST resource
 * @param {String} url - base URL
 */
export function baseUrl(url: string): <TFunction extends Function>(Target: TFunction) => TFunction {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getBaseUrl = function (): string {
      return url;
    };
    return Target;
  };
}

export interface IHeader {
  [key: string]: string;
}

/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function defaultHeaders(headers: IHeader): <TFunction extends Function>(Target: TFunction) => TFunction {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getDefaultHeaders = function (): IHeader {
      return headers;
    };
    return Target;
  };
}
