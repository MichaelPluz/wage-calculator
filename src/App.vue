<template>
    <div>
        <WageCalculator/>
    </div>
</template>

<script>
    import WageCalculator from './components/WageCalculator'

    export default {
        name: 'App',
        components: {
            WageCalculator
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    div {
        width: 100%;
    }

</style>
