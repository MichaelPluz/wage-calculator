import WageCalculator from "../../src/WageCalculator";
import {roundCur} from "../../src/helper"
import {arrTestGroups, arrFields} from './TestData';

describe('WageCalculator', () => {

    for (let iTest = 0; iTest < arrTestGroups.length; iTest++) {

        let testGroup = arrTestGroups[iTest];
        let arrTests = testGroup.tests;

        describe('Test#' + (iTest + 1) + ', Days/Week:' + testGroup.daysWeek + ', Days/Year:' + testGroup.daysYear +
            ', Hours/Day:' + testGroup.hours, () => {

            let wc = new WageCalculator(testGroup.daysWeek, testGroup.daysYear);
            wc.hours = testGroup.hours;

            for (const oTestVal of arrTests) {
                for (const field of arrFields) {

                    test('set field "' + field + '" to $' + oTestVal[field], () => {

                        wc.calc(oTestVal[field], field);

                        expect(wc.hours).toBe(oTestVal.hours);
                        expect(wc.daysWeek).toBe(oTestVal.daysWeek);
                        expect(wc.daysYear).toBe(oTestVal.daysYear);

                        expect(roundCur(roundCur(wc.hourly))).toBe(roundCur(oTestVal.hourly));
                        expect(roundCur(wc.daily)).toBe(roundCur(oTestVal.daily));
                        expect(roundCur(wc.weekly)).toBe(roundCur(oTestVal.weekly));
                        expect(roundCur(wc.monthly)).toBe(roundCur(oTestVal.monthly));
                        expect(roundCur(wc.yearly)).toBe(roundCur(oTestVal.yearly));
                    })
                }
            }

        })
    }
});
