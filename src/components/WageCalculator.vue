<template>
    <div id="wage-calculator" ref="wage-calculator" class="container-fluid border border-dark border-radius-1 pt-1">

        <settings :settings="settings" @set-settings="setSettings" ref="settings-button"></settings>

        <div class="form-group row form-inline table-sm">
            <label for="hourly" class="col-3 col-sm-2 col-form-label">Hourly:</label>
            <div class="col-9 col-sm-10 nowrap">
                $ <input type="number" class="form-control form-control-sm d-inline" id="hourly" name="hourly" ref="hourly" min="0" step=any @keypress="currency($event)" :value="roundCur(hourly)" @input="calcEvent($event, 'hourly')"/>
            </div>
        </div>

        <div class="form-group row form-inline">
            <label for="hours" class="col-3 col-sm-2 col-form-label">Hours/Day:</label>
            <div class="col-9 col-sm-10">
                <select id="hours" name="hours" :value="hours" @input="calcEvent($event, 'hours')">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
        </div>

        <div class="form-group row form-inline">
            <label for="daily" class="col-3 col-sm-2 col-form-label">Daily:</label>
            <div class="col-9 col-sm-10 nowrap">
                $ <input type="number" class="form-control form-control-sm d-inline" id="daily" name="daily" ref="daily" min="0" step=any @keypress="currency($event)" :value="roundCur(daily)" @input="calcEvent($event, 'daily')"/>
            </div>
        </div>

        <div class="form-group row form-inline">
            <label for="weekly" class="col-3 col-sm-2 col-form-label">Weekly:</label>
            <div class="col-9 col-sm-10 nowrap">
                $ <input type="number" class="form-control form-control-sm d-inline" id="weekly" name="weekly" ref="weekly" min="0" step=any @keypress="currency($event)" :value="roundCur(weekly)" @input="calcEvent($event, 'weekly')"/>
            </div>
        </div>

        <div class="form-group row form-inline">
            <label for="monthly" class="col-3 col-sm-2 col-form-label">Monthly:</label>
            <div class="col-9 col-sm-10 nowrap">
                $ <input type="number" class="form-control form-control-sm d-inline" id="monthly" name="monthly" ref="monthly" min="0" step=any @keypress="currency($event)" :value="roundCur(monthly)" @input="calcEvent($event, 'monthly')"/>
            </div>
        </div>
        <div class="form-group row form-inline">
            <label for="yearly" class="col-3 col-sm-2 col-form-label">Yearly:</label>
            <div class="col-9 col-sm-10 nowrap">
                $ <input type="number" class="form-control form-control-sm d-inline" id="yearly" name="yearly" ref="yearly" min="0" step=any @keypress="currency($event)" :value="roundCur(yearly)" @input="calcEvent($event, 'yearly')"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                 <cog-wheel-icon alt="Settings" class="cog-wheel-icon" style="width:1em;height:1em" @click="this.$refs['settings-button'].displaySettings = true"></cog-wheel-icon>
                 <u class="ml-1">Settings</u>
            </div>
        </div>
        <div class="form-group row form-inline">
            <div class="col-3 col-sm-2 col-form-label">Days/Week:</div>
            <div class="col-9 col-sm-10 nowrap">
                {{ daysWeek }}
            </div>
        </div>

        <div class="form-group row form-inline">
            <div class="col-3 col-sm-2 col-form-label">Days/Year:</div>
            <div class="col-9 col-sm-10 nowrap">
                {{ roundCur(daysYear) }}
            </div>
        </div>


        <div class="form-row" v-if="false">
            <div class="col  col-sm-12">
                <div class="jumbotron text-left">
                    <p>Hourly: ${{ roundCur(hourly)}} | ${{hourly}}</p>
                    <p>Hours/Day: {{ roundCur(hours)}} | {{hours}}</p>
                    <p>Daily: ${{ roundCur(daily)}} | ${{daily}}</p>
                    <p>Days/Week: {{ daysWeek }}</p>
                    <p>Weekly: ${{ roundCur(weekly)}} | ${{weekly}}</p>
                    <p>Monthly: ${{ roundCur(monthly)}} | ${{monthly}}</p>
                    <p>Yearly: ${{ roundCur(yearly)}} | ${{yearly}}</p>
                    <hr/>
                    <p>Days/Year: {{ daysYear}}</p>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    //import {roundCur} from "mathjs";
    import Settings from "./Settings";
    import WageCalculator from "../WageCalculator";
    import {currency, roundCur} from "../helper"
    import CogWheelIcon from "./CogWheelIcon";

    export default {
        name: "WageCalculator",
        components: {
            Settings,
            CogWheelIcon
        },
        data: function () {
            return {
                hourly: 0,
                hours: 8,
                daily: 0,
                daysWeek: 5,
                weekly: 0,
                monthly: 0,
                yearly: 0,
                daysYear: 260
            }
        },
        mounted: function () {
            this.$refs["wage-calculator"].addEventListener("animationend", this.unHighlight, false);
        },
        computed:
            {
                settings() {
                    return {
                        daysWeek: this.daysWeek,
                        daysYear: this.daysYear
                    }
                }
            },
        methods:
            {
                calcEvent(event, touchedField) {
                    this.calc(event.target.value, touchedField);
                },
                calc(value, touchedField) {

                    let oCalc = new WageCalculator(this.daysWeek, this.daysYear);
                    oCalc.hours = this.hours;

                    if (touchedField === "hours")
                        oCalc.calcResetHours(value, this.hourly);
                    else
                        oCalc.calc(value, touchedField);

                    for (let fieldName in this.$data) {
                        if (Object.prototype.hasOwnProperty.call(oCalc, fieldName))
                            this.updateField(fieldName, oCalc[fieldName]);


                    }
                },
                roundCur,
                currency,
                setSettings: function (event) {
                    this.daysWeek = event.daysWeek;
                    this.daysYear = event.daysYear;

                    this.calc(this.$refs['hourly'].value, 'hourly');
                },
                updateField(fieldName, value) {
                    this.$data[fieldName] = value;
                },
                highlightField(fieldName) {
                    this.$refs[fieldName].className = this.$refs[fieldName].className + ' highlight';
                },
                unHighlight(event) {
                    event.target.className = event.target.className.replace(/ highlight/g, '');
                }
            },
        watch: {
            daily: function (val, oldVal) {
                if (val !== oldVal) this.highlightField("daily");
            },
            hourly: function (val, oldVal) {
                if (val !== oldVal) this.highlightField("hourly");
            },
            weekly: function (val, oldVal) {
                if (val !== oldVal) this.highlightField("weekly");
            },
            monthly: function (val, oldVal) {
                if (val !== oldVal) this.highlightField("monthly");
            },
            yearly: function (val, oldVal) {
                if (val !== oldVal) this.highlightField("yearly");
            },
        }
    }
</script>

<style lang="css" src="../assets/styles/styles.css"></style>
