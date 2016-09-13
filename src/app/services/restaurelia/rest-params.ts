import { RESTClient } from './rest-client';

function paramBuilder(paramName: string): (key: string) =>
  (target: RESTClient, propertyKey: string | symbol, parameterIndex: number) => void {
  return function (key: string): (target: RESTClient, propertyKey: string | symbol, parameterIndex: number) => void {
    return function (target: RESTClient, propertyKey: string | symbol, parameterIndex: number): void {
      const metadataKey = `${propertyKey}_${paramName}_parameters`;
      const paramObj: any = {
        key: key,
        parameterIndex: parameterIndex
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export var path = paramBuilder('path');
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export var query = paramBuilder('query');
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export var body = paramBuilder('body')('body');
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export var header = paramBuilder('header');
