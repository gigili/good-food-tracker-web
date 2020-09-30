import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import AuthenticationStore from "./modules/AuthenticationStore";

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
	key: 'gft',
	storage: window.localStorage,
	reducer: state => ({
		AuthenticationStore: state.AuthenticationStore,
	}),
})

export default new Vuex.Store({
	plugins: [
		vuexLocalStorage.plugin
	],
	state: {},
	mutations: {},
	actions: {},
	modules: {
		AuthenticationStore
	}
})
