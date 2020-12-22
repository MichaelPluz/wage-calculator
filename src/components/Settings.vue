<template>
    <div class="settings-button" @click="displaySettings=true">
        <cog-wheel-icon alt="Settings" class="cog-wheel-icon" style="width:1.5em;height:1.5em" ></cog-wheel-icon>
    </div>
    <div ref="settings-modal" class="modal p-1 p-sm-3" v-if="displaySettings">
        <div class="settings-box w-100 h-100 bg-white rounded-lg container pt-2">
            <h2 class="h2 float-left">Settings</h2>

            <button type="button" class="close float-right" aria-label="Close" @click="displaySettings=false">
                <span aria-hidden="true">&times;</span>
            </button>

            <div class="form-group row form-inline">
                <label for="daysWeek" class="col-sm-4 col-form-label">Days/Week:</label>
                <div class="col-sm-8">
                    <select id="daysWeek" name="daysWeek" ref="daysWeek" :value="settings_.daysWeek" @change="calcEvent($event, 'daysWeek')">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
            </div>

            <div class="form-group row form-inline">
                <label for="daysYear" class="col-sm-4 col-form-label nowrap">Working Days/Year:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control form-control-sm" id="daysYear" name="daysYear" ref="daysYear" min="0" max="366" step=any @keypress="currency($event)" :value="roundCur(settings_.daysYear)" @input="calcEvent($event, 'daysYear')"/>
                </div>
            </div>

            <div class="form-check">
                <input type="checkbox" class="form-check-input " id="recalcVal" name="recalcVal" v-model="recalcVal"/>
                <label for="recalcVal">Recalculate Days/Week / Days/Year values </label>
            </div>

            <button class="btn btn-sm btn-outline-primary mt-3 mb-2" type="button" @click="Save">Save</button>
            <button class="btn btn-sm btn-outline-primary ml-2 mt-3 mb-2" type="button" @click="displaySettings=false">Close</button>
        </div>
    </div>
</template>

<script>
    import WageCalculator from "../WageCalculator";
    import {currency, roundCur, round} from "../helper"
    import CogWheelIcon from "./CogWheelIcon";

    export default {
        name: "Settings",
        props: {
            settings: Object
        },
        components: {
            CogWheelIcon
        },
        data: function () {
            return {
                settings_: Object,
                displaySettings: false,
                recalcVal: false
            }
        },
        emits: ['set-settings'],
        methods:
            {
                Save() {
                    this.$emit("set-settings", this.settings_);
                    this.displaySettings = false;
                },
                calcEvent(event, touchedField) {
                    this.calc(event.target.value, touchedField);
                },
                calc(value, touchedField) {

                    this.settings_.[touchedField] = parseFloat(value);

                    if (!this.recalcVal) return;

                    if (touchedField === "daysWeek") {
                        this.settings_.daysYear = WageCalculator.calcDaysInYearFromWeek(value);
                        this.highlightField("daysYear");
                    } else if (touchedField === "daysYear") {
                        this.settings_.daysWeek = round(WageCalculator.calcDaysInWeekFromYear(value));
                        this.highlightField("daysWeek");
                    }
                },
                highlightField(fieldName) {
                    this.$refs[fieldName].className = this.$refs[fieldName].className + ' highlight';
                },
                unHighlight(event) {
                    event.target.className = event.target.className.replace(/ highlight/g, '');
                },
                currency,
                roundCur,
                round
            },
        watch: {
            displaySettings(value) {
                if (value) {
                    this.settings_ = {...this.settings};

                    if (this.$refs["settings-modal"])
                        this.$refs["settings-modal"].addEventListener("animationend", this.unHighlight, false);
                }
            },
            /**
             *  Recalculate  Days/Year (daysYear) value when  Recalculate checkbox checked
             * @param value
             */
            recalcVal(value) {
                if (value) {
                    this.calc(this.$refs.daysWeek.value, "daysWeek");
                }
            }
        }
    }
</script>


<style scoped>

    select {
        width: 6em !important;
    }

    .settings-button {
        float: right;
        width: 1.5em;
    }

    .modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .2);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        z-index: 2000;

    }

    .settings-box {
        overflow: scroll;
    }



</style>
