import Vue from 'vue'
import Vuex from 'vuex'
import globalAxios from 'axios';

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cookies: 0,
		cookies_ever_made: 0,
		click: 1,
		cps: 0,
		buildings: [
			{building: 'Cursor', cps: 0.1, price: 15, base_price: 15, owned: 0, upgrades: 0},
			{building: 'Grandma', cps: 1, price: 100, base_price: 100, owned: 0, upgrades: 0},
			{building: 'Farm', cps: 8, price: 1100, base_price: 1100, owned: 0, upgrades: 0},
			{building: 'Mine', cps: 47, price: 12000, base_price: 12000, owned: 0, upgrades: 0},
			{building: 'Factory', cps: 270, price: 130000, base_price: 130000, owned: 0, upgrades: 0},
			{building: 'Bank', cps: 1400, price: 1400000, base_price: 1400000, owned: 0, upgrades: 0},
			{building: 'Temple', cps: 7800, price: 20000000, base_price: 20000000, owned: 0, upgrades: 0},
			{building: 'Wizard Tower', cps: 44000, price: 330000000, base_price: 330000000, owned: 0, upgrades: 0},
			{building: 'Shipment', cps: 260000, price: 5100000000, base_price: 5100000000, owned: 0, upgrades: 0}
		],
		upgrades: [
			{type: 'Cursor', name: 'Reinforced index finger', quantity_needed: 1, price: 100, owned: false},
			{type: 'Cursor', name: 'Carpal tunnel preventiuon cream', quantity_needed: 1, price: 500, owned: false},
			{type: 'Cursor', name: 'Ambidexterous', quantity_needed: 10, price: 10000, owned: false},
			{type: 'Cursor', name: 'Thousand fingers', quantity_needed: 25, price: 100000, owned: false},
			{type: 'Cursor', name: 'Milion fingers', quantity_needed: 50, price: 10000000, owned: false},
			{type: 'Cursor', name: 'Bilion fingers', quantity_needed: 100, price: 100000000, owned: false},
			{type: 'Grandma', name: 'Forwards from grandma', quantity_needed: 1, price: 1000, owned: false},
			{type: 'Grandma', name: 'Steel-plated rolling pins', quantity_needed: 5, price: 5000, owned: false},
			{type: 'Grandma', name: 'Lubricated dentures', quantity_needed: 25, price: 50000, owned: false},
			{type: 'Grandma', name: 'Prune juice', quantity_needed: 50, price: 5000000, owned: false},
			{type: 'Grandma', name: 'Double-thick glassed', quantity_needed: 100, price: 500000000, owned: false},
			{type: 'Farm', name: 'Cheap hoes', quantity_needed: 1, price: 11000, owned: false},
			{type: 'Farm', name: 'Fertilizer', quantity_needed: 5, price: 55000, owned: false},
			{type: 'Farm', name: 'Cookie trees', quantity_needed: 25, price: 550000, owned: false},
			{type: 'Farm', name: 'Genetically-modified cookies', quantity_needed: 50, price: 55000000, owned: false},
			{type: 'Mine', name: 'Sugar gas', quantity_needed: 1, price: 120000, owned: false},
			{type: 'Mine', name: 'Megadrill', quantity_needed: 5, price: 600000, owned: false},
			{type: 'Mine', name: 'Ultradrill', quantity_needed: 25, price: 6000000, owned: false},
			{type: 'Mine', name: 'Ultimadrill', quantity_needed: 50, price: 600000000, owned: false},
			{type: 'Factory', name: 'Strudier conveyor belts', quantity_needed: 1, price: 1300000, owned: false},
			{type: 'Factory', name: 'Child labor', quantity_needed: 5, price: 6500000, owned: false},
			{type: 'Factory', name: 'Sweatshop', quantity_needed: 25, price: 65000000, owned: false},
			{type: 'Bank', name: 'Taller tellers', quantity_needed: 1, price: 14000000, owned: false},
			{type: 'Bank', name: 'Sweatshop', quantity_needed: 5, price: 70000000, owned: false},
			{type: 'Temple', name: 'Scissor-resistant credit cardss', quantity_needed: 1, price: 200000000, owned: false},
			{type: 'Temple', name: 'Sacrifices', quantity_needed: 5, price: 1000000000, owned: false},
			{type: 'Wizard Tower', name: 'Pointier hats', quantity_needed: 1, price: 3300000000, owned: false},
			{type: 'Wizard Tower', name: 'Beardlier beards', quantity_needed: 5, price: 16500000000, owned: false}
		]
	},
	mutations: {
		ADD_COOKIE(state, payload) {
			this.state.cookies += payload;
			this.state.cookies_ever_made += payload;
		},
		BUY_BUILDING(state, index) {
			if(this.state.cookies >= this.state.buildings[index].price) {
				this.state.buildings[index].owned += 1;
				this.state.cookies -= this.state.buildings[index].price;
				this.state.buildings[index].price = Math.ceil(this.state.buildings[index].base_price * Math.pow(1.15, this.state.buildings[index].owned));
				
				this.state.cps = 0;
				this.state.buildings.forEach((place) => {
					this.state.cps += place.cps * place.owned * Math.pow(2, place.upgrades);					
				});		
			}
		},
		BUY_UPGRADE(state, index) {
			if(this.state.cookies >= this.state.upgrades[index].price) {
				this.state.upgrades[index].owned = true;
				this.state.cookies -= this.state.upgrades[index].price;
				
				this.state.cps = 0;
				if(this.state.upgrades[index].type === 'Cursor') {
					this.state.click *= 2;
				}
				this.state.buildings.forEach((place) => {
					if(place.building === this.state.upgrades[index].type) {
						place.upgrades += 1;
					}
					this.state.cps += place.cps * place.owned * Math.pow(2, place.upgrades);
				});	
			}
		},
		SAVE_DATA(state) {
			localStorage.setItem('state', JSON.stringify(this.state));
		},
		LOAD_DATA(state) {
			const local = localStorage.getItem('state');
			if(local) {				
				this.state.cookies = JSON.parse(local).cookies;
				this.state.cookies_ever_made = JSON.parse(local).cookies_ever_made;
				this.state.click = JSON.parse(local).click;
				this.state.cps = JSON.parse(local).cps;
				this.state.buildings = JSON.parse(local).buildings;
				this.state.upgrades = JSON.parse(local).upgrades;
			}
		},
		CLEAR_DATA(state) {
			localStorage.removeItem('state');
		}
	},
	actions: {
		add_cookie({commit}, payload) {
			commit('ADD_COOKIE', payload);
		},
		buy_building({commit}, index) {
			commit('BUY_BUILDING', index);
		},
		buy_upgrade({commit}, index) {
			commit('BUY_UPGRADE', index);
		},
		save_data({commit}) {
			commit('SAVE_DATA');
		},
		load_data({commit}) {
			commit('LOAD_DATA');
		},
		clear_data({commit}) {
			commit('CLEAR_DATA');
		}
	},
	getters: {
		cookies: state => {
			return state.cookies;
		},
		cookies_ever_made: state => {
			return state.cookies_ever_made;
		},
		cps: state => {
			return state.cps;
		},
		click: state => {
			return state.click;
		},
		buildings: state => {
			return state.buildings;
		},
		upgrades: state => {
			return state.upgrades;
		},
		cursors: state => {
			return state.buildings[0].owned;
		}
	}
})