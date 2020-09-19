const state = {
	isLoggedIn: false,
	token: null,
	user: null
};

const getters = {
	isLoggedIn(state) {
		return state.isLoggedIn;
	},
	token(state) {
		return state.token;
	},
	user(state){
		return state.user;
	}
};

const actions = {};

const mutations = {
	setIsLoggedIn(state, isLoggedIn) {
		state.isLoggedIn = isLoggedIn;
	},
	setToken(state, token) {
		state.token = token;
	},
	setUser(state, user) {
		state.user = user;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
