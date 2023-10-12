/**
 * Request contract for all requests from API
 *
 * @export
 * @interface IGenericRequest
 * @template T The type of the request
 */

export interface IGenericRequest<T> {
    /**
     * Build the request
     *
     * @returns {T} The request object built
     * @memberof IGenericRequest
     */
    build(): T;
}
