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

const mixin = {
	methods: {
		trn: function (p1, p2) {
			console.log('foo', p1, p2);
			return translate(p1, p2)
		}
	}
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
	mixins: [mixin]
}).$mount('#app')
