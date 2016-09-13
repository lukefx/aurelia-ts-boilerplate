/*
 * RESTAURELIA
 * Aurelia services to handle Restful Resources properly and easily
 *
 * Based on https://github.com/Paldom/angular2-rest
 * (c) Domonkos Pal
 * License: MIT
 *
 * Table of Contents:
 *
 * - class RESTClient
 *
 * - Class Decorators:
 * @baseUrl(String)
 * @defaultHeaders(Object)
 *
 * - Method Decorators:
 * @GET(url: String)
 * @POST(url: String)
 * @PUT(url: String)
 * @DELETE(url: String)
 * @Headers(object)
 * @Produces(MediaType)
 *
 * - Parameter Decorators:
 * @path(string)
 * @query(string)
 * @header(string)
 * @body
 */

export * from './rest-client';
export * from './rest-methods';
export * from './rest-params';
export * from './rest-model';
