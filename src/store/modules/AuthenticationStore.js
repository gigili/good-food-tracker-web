const AuthenticationStore = {
	namespaced: true,
	state: {
		isLoggedIn: false,
		tokenData: {
			token: null,
			refreshToken: null,
			expires: null
		},
		user: {
			id: null,
			guid: null,
			name: null,
			email: null,
			username: null,
			image: null,
			power: 0
		}
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
		profileImage(state){
			return `${process.env.VUE_APP_API_URL}/${state.user.image}`
		}
	},
	actions: {},
	mutations: {
		setIsLoggedIn(state, isLoggedIn) {
			state.isLoggedIn = isLoggedIn;
		},
		setTokenData(state, tokenData) {
			if(tokenData.access_token){
				state.tokenData.token = tokenData.access_token;
			}

			if(tokenData.refresh_token){
				state.tokenData.refreshToken = tokenData.refresh_token;
			}

			if(tokenData.expires){
				state.tokenData.expires = tokenData.expires;
			}
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
