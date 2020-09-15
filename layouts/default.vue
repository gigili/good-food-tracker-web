<template>
	<v-app>
		<v-app-bar app color="primary">
			<v-flex xs12 row style="padding-left: 1rem">
				<router-link to="/">
					<v-toolbar-title v-text="title"/>
				</router-link>

				<v-spacer></v-spacer>
				<span v-if="!isLoggedIn">
					<router-link to="/login">
						<v-btn dark text>Login</v-btn>
					</router-link>

					<router-link to="/register">
						<v-btn dark text>Register</v-btn>
					</router-link>
				</span>
				<v-btn medium v-else>Logout</v-btn>
			</v-flex>
		</v-app-bar>

		<v-main>
			<v-container>
				<nuxt/>
			</v-container>
		</v-main>

		<v-footer app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	computed: {
		isLoggedIn() {
			return this.$store.state.AuthenticationStore.isLoggedIn
		}
	},
	data() {
		return {
			title: 'Good Food Tracker'
		}
	}
}
</script>

<style scoped>
.v-toolbar__title {
	color: aquamarine;
}
</style>
