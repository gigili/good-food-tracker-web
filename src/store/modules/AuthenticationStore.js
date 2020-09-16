//import axios from 'axios';

const state = {
	isLoggedIn: false,
	token: null
};

const getters = {
	isLoggedIn(state) {
		return state.isLoggedIn;
	},
	token(state) {
		return state.token;
	}
};

const actions = {};

const mutations = {
	setIsLoggedIn(state, isLoggedIn) {
		state.isLoggedIn = isLoggedIn;
	},
	setToken(state, token) {
		state.token = token;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
