// Import the `mount()` method from Vue Test Utils
import {mount} from '@vue/test-utils'
import WageCalculator from '../../src/components/WageCalculator.vue';
import Settings from '../../src/components/Settings.vue';
import {roundCur} from "../../src/helper"
import {arrTests_1, arrFields} from './TestData';


describe('Settings', () => {


    test('initial state', async () => {

        const wrapper = mount(WageCalculator, {});
        const settingsWrapper = wrapper.findComponent(Settings);

        await wrapper.get(".cog-wheel-icon").trigger("click");

        expect(settingsWrapper.find('.modal').isVisible()).toBe(true);

        const text = settingsWrapper.get('.modal').text();

        expect(text).toMatch('Settings');
        expect(text).toMatch('Days/Week:');
        expect(text).toMatch('Working Days/Year:');
        expect(text).toMatch('Recalculate Days/Week / Days/Year values');
        expect(text).toMatch('Save');
        expect(text).toMatch('Close');

        expect(settingsWrapper.get('#daysWeek').element.value).toBe('5');
        expect(settingsWrapper.get('#daysYear').element.value).toBe('260');
        expect(settingsWrapper.get("#recalcVal").element.checked).toBe(false);

    });

    const settingsDefaultProps = {settings: {daysWeek: 5, daysYear: 260}};

    test('set values - no Recalculation', async () => {

        const wrapper = mount(Settings, {
            props: settingsDefaultProps
        });

        await wrapper.get('.settings-button').trigger("click");

        expect(wrapper.get("#recalcVal").element.checked).toBe(false);

        // set Days/Week to '4'
        await wrapper.get('#daysWeek').setValue("4");
        expect(wrapper.get('#daysWeek').element.value).toBe("4");
        expect(wrapper.get('#daysYear').element.value).toBe("260");

        // set Days/Week to '250'
        await wrapper.get('#daysYear').setValue('250');
        expect(wrapper.get('#daysWeek').element.value).toBe('4');
        expect(wrapper.get('#daysYear').element.value).toBe('250');

    });


    test('set values - Recalculation', async () => {

        const wrapper = mount(Settings, {
            props: settingsDefaultProps
        });

        await wrapper.get('.settings-button').trigger("click");

        expect(wrapper.get("#recalcVal").element.checked).toBe(false);

        await wrapper.get("#recalcVal").setChecked();
        expect(wrapper.get("#recalcVal").element.checked).toBe(true);

        //set Days/Week to '4'
        await wrapper.get('#daysWeek').setValue('4');
        expect(wrapper.get('#daysWeek').element.value).toBe('4');
        expect(wrapper.get('#daysYear').element.value).toBe('208.57');

        //set Days/Week to '250'
        await wrapper.get('#daysYear').setValue('240');
        expect(wrapper.get('#daysYear').element.value).toBe('240');
        expect(wrapper.get('#daysWeek').element.value).toBe('5');

    });

    test('save values to parent', async () => {

        const wrapper = mount(WageCalculator, {});
        const settingsWrapper = wrapper.findComponent(Settings);

        await wrapper.get(".cog-wheel-icon").trigger("click");
        expect(settingsWrapper.find('.modal').isVisible()).toBe(true);

        await wrapper.get('#daysWeek').setValue('4');
        await wrapper.get('#daysYear').setValue('210');

        // save values in the Settings window and close it
        await settingsWrapper.vm.Save();

        // Check the chnaged values passed to the main window
        const text = wrapper.text();
        expect(text).toMatch('Days/Week:4');
        expect(text).toMatch('Days/Year:210');


    });


});
