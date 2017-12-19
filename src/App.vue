<template>
  <div id="app">
    <div class="cookies">
      <app-counter></app-counter>
      <app-cookie></app-cookie>
    </div>
    <div class="buildings">
      <app-local></app-local>
      <app-buildings></app-buildings>      
      <app-upgrades></app-upgrades>
    </div>
  </div>
</template>

<script>
import Cookie from './components/cookie.vue';
import Counter from './components/counter.vue';
import Buildings from './components/buildings.vue';
import Upgrades from './components/upgrades.vue';
import Local from './components/local.vue';

export default {
  name: 'app',
  components: {
    'app-cookie': Cookie,
    'app-counter': Counter,
    'app-buildings': Buildings,
    'app-upgrades': Upgrades,
    'app-local': Local
  },
  created() {
    this.$store.dispatch('load_data');
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-user-select: none;       
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #eacda3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #d6ae7b, #eacda3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #d6ae7b, #eacda3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .click {
    cursor: pointer;
    box-shadow: 2px 4px 4px rgba(0,0,0,0.5);
  }
  
  .click:active {
    box-shadow: 1px 2px 2px rgba(0,0,0,0.8);
    transform: translate(1px, 2px);
  }

  .invalid {
    opacity: 0.33;    
    box-shadow: 1px 2px 2px rgba(0,0,0,0.8);
    transform: translate(1px, 2px);
  }

  .valid {
    animation: shake .3s;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  small {
    font-weight: 700;
    float: right;
    color: green;
    text-shadow: 0px 0px 12px white;
  }

  @media only screen and (min-width: 600px) {
    #app {      
      display: flex;
    }

    .cookies {
      flex: 5;
    }

    .buildings {
      flex: 3;
    }
  }
</style>
