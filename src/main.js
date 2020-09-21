import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import utilities from "./helpers/utilities";
import translate from "@/helpers/translation";

Vue.config.productionTip = false

const language = localStorage.getItem(process.env.VUE_APP_LANG) || "english";
utilities.set_language(language);

Vue.mixin({
	methods: {
		translate(translationKey = "", capitalizeFirstLetter = true) {
			//console.log(translationKey);
			//TODO: Find out why this function is getting called on every key press
			return translate(translationKey, capitalizeFirstLetter)
		}
	}
})

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')
