import _ from "lodash";

/**
 *  The function to call from input keypress event to filter only currency signs: digits and dot.
 *
 * @param event
 */
export function currency(event) {
    if (!((event.charCode >= 48 && event.charCode <= 57) ||
        event.charCode === 46 || event.charCode === 0))
        event.preventDefault();
}

/**
 *  Round value as currency - two signs after dot
 * @param {number} inputValue Float number to round
 * @returns {number}
 */
export function roundCur(inputValue) {
    return _.round(inputValue, 2);
}

/**
 * Round value to the whole number
 *
 * @param {number} inputValue  Float number to round
 * @returns {number}
 */
export function round(inputValue) {
    return _.round(inputValue);
}
