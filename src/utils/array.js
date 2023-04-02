/**
 * @param {Any} object
 *
 * @returns {Boolean}
 */
export function isIterable(object) {
    return typeof object[Symbol.iterator] === 'function';
}