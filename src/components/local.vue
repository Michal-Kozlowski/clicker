<template>
    <div>
        <button class="click" @click="save_data">save</button>
        <button class="click" @click="load_data">load</button>
        <button class="click" @click="clear_data">clear</button>
        <p v-show="show">{{message}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                show: false,
                time: null,
                autosave: null
            }
        },
        methods: {
            save_data() {
                this.$store.dispatch('save_data');
                this.message = 'game saved';
                this.timeout();
            },
            load_data() {
                this.$store.dispatch('load_data');
                this.message = 'game loaded';
                this.timeout();                
            },            
            clear_data() {
                this.$store.dispatch('clear_data');
                this.message = 'save deleted';
                this.timeout();                
            },
            timeout() {
                clearTimeout(this.time);                
                this.time = setTimeout(() => {this.show = false}, 2000);
                this.show = true;
            }
        },
        created() {
            this.autosave = setInterval(() => {
                this.save_data();
            }, 180000);
        }
    }
</script>

<style scoped>
    div {
        width: 250px;
        margin: auto;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: 50px;
    }

    button {
        text-transform: capitalize;
        font-size: 1.2em;
        font-weight: 700;
        padding: 10px;
        margin: 5px 2px;
        border: 1px solid black;
        background-color: #cca853;
    }

    p {
        text-transform: capitalize;
        font-weight: 700;
        position: absolute;
        margin-left: 75px;
        top: 75px;
        text-transform: capitalize;
        text-shadow: 0px 0px 10px white;
    }
</style>