import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import utilities from "./helpers/utilities";

Vue.config.productionTip = false

const language = localStorage.getItem(process.env.VUE_APP_LANG) || "english";
utilities.set_language(language);

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
