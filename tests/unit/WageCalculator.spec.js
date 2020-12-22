// Import the `mount()` method from Vue Test Utils
import {shallowMount} from '@vue/test-utils'
import WageCalculator from '../../src/components/WageCalculator.vue';
import {roundCur} from "../../src/helper"
import {arrTests_1, arrFields} from './TestData';

const oTest = arrTests_1[9];


describe('WageCalculator', () => {

    test('initial state', () => {
        const wrapper = shallowMount(WageCalculator, {});

        // Assert the rendered text of the component
        const text = wrapper.text();

        expect(text).toMatch('Hourly: $');
        expect(text).toMatch('Hours/Day:');
        expect(text).toMatch('Daily: $');
        expect(text).toMatch('Weekly: $');
        expect(text).toMatch('Yearly: $');
        expect(text).toMatch('Settings');
        expect(text).toMatch('Days/Week:5');
        expect(text).toMatch('Days/Year:260');

        expect(wrapper.get('#hourly').element.value).toMatch('0');
        expect(wrapper.get('#hours').element.value).toMatch('8');
        expect(wrapper.get('#daily').element.value).toMatch('0');
        expect(wrapper.get('#weekly').element.value).toMatch('0');
        expect(wrapper.get('#monthly').element.value).toMatch('0');
        expect(wrapper.get('#yearly').element.value).toMatch('0');

    });

    describe('calculation', () => {
        const wrapper = shallowMount(WageCalculator, {});

        for (const field of arrFields) {

            test('set field "' + field + '" to $' + oTest[field], async () => {
                await wrapper.get('#' + field).setValue(oTest[field]);

                expect(roundCur(wrapper.get('#hourly').element.value)).toBe(roundCur(oTest.hourly));
                expect(roundCur(wrapper.get('#hours').element.value)).toBe(roundCur(oTest.hours));
                expect(roundCur(wrapper.get('#daily').element.value)).toBe(roundCur(oTest.daily));
                expect(roundCur(wrapper.get('#weekly').element.value)).toBe(roundCur(oTest.weekly));
                expect(roundCur(wrapper.get('#monthly').element.value)).toBe(roundCur(oTest.monthly));
                expect(roundCur(wrapper.get('#yearly').element.value)).toBe(roundCur(oTest.yearly));
            });

        }
    });

});
