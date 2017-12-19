<template>
    <div>
        <h1>Cookies: {{Math.floor(cookies)}}</h1>
        <h3>Cookies per second: {{Math.floor(cps*10 + 0.00001)/10}}</h3>
        <p>Cookies ever made: {{Math.floor(cookies_ever_made)}}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            cookies(){
                return this.$store.getters.cookies;
            },
            cookies_ever_made(){
                return this.$store.getters.cookies_ever_made;
            },
            cps(){
                return this.$store.getters.cps;
            }
        },
        created() {
            setInterval(() => {
                this.$store.dispatch('add_cookie', this.cps/10);
            }, 100);
        }
    }
</script>

<style scoped>
    h1, h3, p {
        text-align: center;
    }

    h1 {
        font-size: 3em;
    }
</style>