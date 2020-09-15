interface AuthenticationStore {
	isLoggedIn: boolean,
	token: string | null
}

export const state = () => ({
	isLoggedIn: false,
	token: ""
});

export const mutations = {
	setLoggedIn(state: AuthenticationStore, isLoggedIn: boolean) {
		state.isLoggedIn = isLoggedIn;
	},
	setToken(state: AuthenticationStore, token: string | null) {
		state.token = token;
	}
}

export const actions = {
	login(username: string, password: string) {

	},

	register(name: string, email: string, username: string, password: string) {
	}
}
