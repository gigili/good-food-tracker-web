<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/" class="btn">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/register" class="btn">
        <v-btn text>
          <span class="mr-2">Register</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/login" class="btn">
        <v-btn text>
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/logout" class="btn">
        <v-btn text>
          <span class="mr-2">Logout</span>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
