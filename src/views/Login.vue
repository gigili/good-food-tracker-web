<template>
  <v-app class="pa-5">
    <div class="login">
      <v-row no-gutters>
        <v-col cols="12" sm="6" class="pa-5">
          <v-card class="pa-5" outlined tile>
            <h1 v-once>{{ translate("login") }}</h1>
            <hr/>
            <div class="lipsum">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut doloremque maxime nemo
              reprehenderit?
              Asperiores cum, cupiditate eius hic molestiae neque provident. Accusantium consectetur consequuntur
              eligendi laborum obcaecati repudiandae temporibus?
            </div>
            <div class="lipsum">Adipisci aspernatur consectetur, dolores eveniet ipsam iure labore laudantium odio omnis
              optio sed
              soluta veritatis. Ad commodi eos eveniet facere inventore, iste labore, magni numquam perspiciatis quaerat
              temporibus vero, voluptas.
            </div>
            <div class="lipsum">Adipisci aliquam cumque dolore facilis laudantium molestiae nulla rem saepe vero vitae.
              Aliquam
              blanditiis cupiditate ea eum fuga, illo incidunt ipsum iste, minus neque nostrum odit qui soluta
              temporibus voluptate?
            </div>
            <div class="lipsum">Aperiam atque autem blanditiis, cupiditate delectus doloremque ea eaque esse et, eum
              eveniet inventore
              ipsum labore laboriosam minima natus non odit possimus quibusdam quis quo repellat repellendus sit ullam,
              velit?
            </div>
            <div class="lipsum">Aliquid dolores earum, illum ipsa maiores quae voluptatem! Autem eligendi eum expedita
              facilis harum
              inventore iure magnam nemo nihil nisi, praesentium, quam, quis quos repudiandae sit soluta voluptate
              voluptates voluptatibus!
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" class="pa-5">
          <v-card class="pa-5" outlined tile>
            <v-alert type="error" border="left" v-if="error.length > 0">{{ error }}</v-alert>
            <v-alert type="info" border="left" v-if="message.length > 0">{{ message }}</v-alert>
            <v-text-field
                v-once
                :label="translate('username')"
                :placeholder="translate('enter_username')"
                type="text"
                v-model="username"/>
            <v-text-field
                v-once
                :label="translate('password')"
                type="password"
                v-model="password"/>
            <v-btn color="primary" v-once @click.prevent="login">{{ translate("login") }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import api from "@/helpers/api";
import utilities from "@/helpers/utilities";

export default {
  name: "Login",
  computed: {
    ...mapGetters("AuthenticationStore", ["isLoggedIn"])
  },
  data() {
    return {
      error: "",
      message: "",
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapMutations("AuthenticationStore", ["setTokenData", "setIsLoggedIn", "setUser"]),
    login() {
      const hashedPassword = utilities.hash(this.password);

      api().post('/login', {
        username: this.username,
        password: hashedPassword
      }).then((response) => {
        const result = response.data;
        this.setTokenData(result.data.tokenData);
        this.setIsLoggedIn((result.data.tokenData.access_token.length > 0));
        this.setUser(result.data.user);
        this.$router.push("/");
      }).catch((err) => {
        this.error = err.response.data.message;
      });
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.lipsum {
  margin-top: 15px;
}
</style>
