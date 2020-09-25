const AuthenticationStore = {
	namespaced: true,
	state: {
		isLoggedIn: false,
		tokenData: {
			token: null,
			refreshToken: null,
			expires: null
		},
		user: null
	},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},
		tokenData(state) {
			return state.tokenData;
		},
		user(state) {
			return state.user;
		},
	},
	actions: {},
	mutations: {
		setIsLoggedIn(state, isLoggedIn) {
			state.isLoggedIn = isLoggedIn;
		},
		setTokenData(state, tokenData) {
			state.tokenData = tokenData;
		},
		removeTokenData(state){
			state.tokenData = {
				token: null,
				refreshToken: null,
				expires: null
			}
		},
		setUser(state, user) {
			state.user = user;
		}
	}
}

export default AuthenticationStore;
