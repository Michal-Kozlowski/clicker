<template>
    <div>
        <ul>
            <li class="click"
                v-for="(item, index) in buildings" 
                @click="buy_building(index)"
                v-if="index === 0 || buildings[index].base_price <= cookies_ever_made"
                :class="{invalid: cookies < item.price, valid: cookies >= item.price}"
            >
                <span>{{item.building}} x {{item.owned}}</span> <br>${{item.price}}
                <small>+{{item.cps * Math.pow(2, item.upgrades)}}cps</small>
            </li>
        </ul>
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
            buildings(){
                return this.$store.getters.buildings;
            }
        },
        methods: {
            buy_building(index) {
                this.$store.dispatch('buy_building', index);
            }
        }
    }
</script>

<style scoped>
    div {
        width: 250px;
        margin: auto;
    }

    ul {
        padding: 0;
    }

    li {
        list-style-type: none;
        padding: 10px;
        margin: 5px 2px;
        border: 1px solid black;
        background-color: #cca853;
        transition: opacity 1s;
        
    }

    span {
        font-size: 1.5em;
        font-weight: bold;
    }
</style>