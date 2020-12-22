/**
 *
 */
export default class WageCalculator {
    hourly = 0;
    hours = 8;
    daily = 0;
    daysWeek = 5;
    weekly = 0;
    monthly = 0;
    yearly = 0;
    daysYear = 261;
    static WEEKS_IN_YEAR = 365/7;

    constructor(daysWeek, daysYear) {
        this.daysWeek = daysWeek;
        this.daysYear = daysYear;
    }

    /**
     *  Recalculates the values of all the fields dependinf on the changed one.
     *
     * @param  {number} value  New value for the field named in touchedField param.
     * @param {string} touchedField  Name of the field being changed.
     */
    calc(value, touchedField) {

        this[touchedField] = value;

        // hours is as if change hourly field, i.e. recalculate all the fields
        if (touchedField === 'hours') {
            touchedField = "hourly";
            value = this.hourly;
        }

        let hoursInMonth = this.daysYear / 12 * this.hours;

        let value_reverse = value;
        let flagMonthly = false;

        // calculate vales BELOW the current case (touchedField)
        switch (touchedField) {
            case "yearly":
                this.monthly = value_reverse = value_reverse / 12;
            /* falls through */
            case "monthly":
                value = this.hourly = value_reverse / hoursInMonth;
                touchedField = "hourly";
                flagMonthly = true;
                break;
            case "weekly": // set up below weekly: daily , hourly
                this.daily = value_reverse = value_reverse / this.daysWeek;
            /* falls through */
            case "daily":    // set up hourly
                this.hourly = value_reverse / this.hours;
        }

        // calculate vales ABOVE the current case (touchedField)
        switch (touchedField) {
            case "hourly":        // set up daily
                this.daily = value = value * this.hours;
            /* falls through */
            case "daily":          // set up weekly
                this.weekly = value = value * this.daysWeek;
            /* falls through */
            case "weekly":         // set up monthly
                if (!flagMonthly) // don't recalculate monthly
                    this.monthly = this.hourly * hoursInMonth;
            /* falls through */
            case "monthly":
                this.yearly = this.monthly * 12;
        }
    }

    /**
     *  Set Hours field and recalculate all the fields stating with hourly one.
     *
     * @param {number} value  New value for Hours field to set
     * @param {number} hourlyValue  Current Hourly field number
     */
    calcResetHours(value, hourlyValue) {
        this.hours = value;
        this.calc(hourlyValue, "hourly");
    }

    /**
     *  Calculates the number of working days in a week from working days of the year.
     *
     * @param {number} daysWeek Number of the working days in a week
     * @returns {number}
     */
    static calcDaysInYearFromWeek(daysWeek) {
    return daysWeek*WageCalculator.WEEKS_IN_YEAR;
    }

    /**
     *   Calculates working days of the year from the number of working days in a week.
     *
     * @param {number} daysYear Number of the working days in a year
     * @returns {number}
     */
    static calcDaysInWeekFromYear(daysYear) {
    return daysYear/WageCalculator.WEEKS_IN_YEAR;
    }

}
