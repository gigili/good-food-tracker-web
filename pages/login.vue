<template>
	<v-app>
		<v-flex>
				<v-text-field v-model="username" label="Username" autocomplete="false"></v-text-field>
				<v-text-field v-model="password" label="Password" autocomplete="false"></v-text-field>
				<v-btn large color="primary" align-center justify-content>Login</v-btn>
		</v-flex>
	</v-app>
</template>

<script>

export default {
	name: "login",
	head() {
		return {
			title: "Login"
		}
	},
	data(){
		return {
			username: "",
			password: "",
		}
	}
}
</script>

<style scoped>

</style>
