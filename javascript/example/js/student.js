import {Observable} from '../util/observable.js';

/**
 * @param {string} id
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} imageUrl
 * @returns Student
 * @constructor
 */
export const Student = ({id, firstname, lastname, imageUrl}) => {

    /**
     * @typedef {{
     *     id: string,
     *     firstname: Observable,
     *     lastname: Observable,
     *     imageUrl: string
     * }} Student
     */
    return {
        id: id,
        firstname: Observable(firstname),
        lastname: Observable(lastname),
        imageUrl: imageUrl,
    }
}
