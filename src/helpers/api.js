import axios from "axios";
import store from "@/store";

export default (requiresAuth = false) => {
	const tokenData = store.getters["AuthenticationStore/tokenData"];
	const options = {
		baseURL: process.env.VUE_APP_API_URL,
		headers: {}
	};

	if (requiresAuth) {
		options.headers.Authorization = `Bearer ${tokenData.token}`
	}

	const instance = axios.create(options);
	const now = Date.now();

	if (tokenData !== null) {
		const tokenExpiresAt = tokenData.expires;
		if ((tokenExpiresAt === null || now > tokenExpiresAt) && tokenData.refreshToken !== null) {
			instance.post(`/refresh`, {
				refresh_token: tokenData.refreshToken
			}).then(response => {
				if (response.data.success) {
					store.commit("setTokenData", {
						token: response.data.access_token,
						expires: response.data.expires
					});
				}
			}).catch(error => {
				console.log(error);
			});
		}
	}

	instance.interceptors.response.use(response => {
		return response;
	}, error => {
		return Promise.reject(error);
	});

	return instance;
};
2
