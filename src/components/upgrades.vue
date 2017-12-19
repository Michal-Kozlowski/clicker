<template>
    <div>
        <ul>
            <li class="click"
                v-for="(item, index) in upgrades" 
                @click="buy_upgrade(index)"
                v-if="!item.owned && check_quantity(item)"
                :class="{invalid: cookies < item.price, valid: cookies >= item.price}"
            >
                {{item.type}}<small>x2</small>  <br><span>${{item.price}}</span>                                      
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
            },
            upgrades(){
                return this.$store.getters.upgrades;
            }
        },
        methods: {
            buy_upgrade(index) {
                this.$store.dispatch('buy_upgrade', index);
            },
            check_quantity(item) {
                let match = false;
                this.$store.getters.buildings.forEach((place) => {
                    if(item.type === place.building && (item.quantity_needed <= place.owned)) {
                        match = true;
                    }
                });
                if(match){
                    return true;
                }
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
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    li {
        text-align: center;
        list-style-type: none;
        padding: 4px;
        margin: 2px;
        border: 1px solid black;
        flex: auto;
        background-color: #d8ad6a;
        transition: opacity 1s;
    }
</style>