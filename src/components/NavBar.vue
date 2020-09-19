<template>
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

    <span v-if="!isLoggedIn">
      <router-link to="/register" class="btn">
        <v-btn text>
          <span class="mr-2">{{ trn("register") }}</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/login" class="btn">
        <v-btn text>
          <span class="mr-2">{{ trn("login") }}</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </router-link>
    </span>

    <span v-else>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            {{ user.name }}
            <v-icon class="ml-2">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <router-link to="/profile" class="profileLinks">{{ trn("profile") }}</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <router-link to="/settings" class="profileLinks">
                {{ trn("settings") }}
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text @click.prevent="logout">
        <span class="mr-2">{{ trn("logout") }}</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import router from "../router";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn", "token", "user"])
  },
  methods: {
    ...mapMutations(["setIsLoggedIn", "setToken"]),
    logout() {
      this.setIsLoggedIn(false);
      this.setToken(null);
      router.push("/login");
    },
    trn(){
      console.log("Logged from within the method");
    }
  }
}
</script>

<style scoped>
.profileLinks {
  text-decoration: none;
  color: #000;
}

.profileLinks:hover {
  color: #696969;
}
</style>
