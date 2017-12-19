<template>
    <div>
        <div class="center">
            <i  class="fa fa-hand-pointer-o" 
                aria-hidden="true" 
                v-for="(cursor, index) in cursors"
                :style="{
                    transform: 'rotate(' + 360*index/cursors + 'deg)',
                    left: -150* Math.sin((360*index/cursors) * Math.PI/180) + 'px',
                    top: 65 + 150 * Math.cos((360*index/cursors) * Math.PI/180) + 'px',
                    fontSize: 25 - 0.1*cursors + 'px'
                }"
            ></i>
            <transition-group name="fade">
                <div class="coins" v-for="(cl, index) in clicked" :key="index">+{{cl}}</div>
            </transition-group>
        </div>
        <p id="button" class="click" @click="add(click)">COOKIE</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clicked: [],
                time: null
            }
        },
        computed: {
            click() {
                return this.$store.getters.click;
            },
            cursors() {
                return this.$store.getters.cursors;
            }
        },
        methods: {
            add(click) {
                clearTimeout(this.time);
                this.$store.dispatch('add_cookie', click);
                this.clicked.push(click);
                this.time = setTimeout(() => {this.clicked.splice(0);}, 1000);             
            }
        }
    }
</script>

<style scoped>
    #button {
        background-image: radial-gradient(#925800 55%, #d8ad6a 80%);
        text-align: center;
        font-weight: bold;
        line-height: 150px;
        margin: 100px auto;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        text-shadow: 0px 0px 10px white;
    }

    .center {
        left: 49.0%;
        width: 50%;
        position: relative;        
    }

    i {
        position: absolute;
        color: white;
        text-shadow: 3px 4px 10px black;
    }

    .coins {
        position: absolute;
        color: white;
        font-weight: 700;
        font-size: 24px;
        text-shadow: 0 0 3px black, 0 0 8px black;
        opacity: 0;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        animation: fade .5s ease-out;
    }


    @keyframes fade {
        0% {transform: translateY(0); opacity: 1}
        100% {transform: translateY(-80px); opacity: 0;}
    }
</style>