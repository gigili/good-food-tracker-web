<template>
  <v-app class="pa-5">
    <div class="login">
      <v-row no-gutters>
        <v-col cols="12" sm="6" class="pa-5">
          <v-card class="pa-5" outlined tile>
            <h1>Login</h1>
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
            <v-text-field name="username" label="Username" placeholder="Enter username..." type="text"
                          v-model="username"/>
            <v-text-field name="password" label="Password" type="password" v-model="password"/>
            <v-btn color="primary" @click.prevent="login">Login</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";

export default {
  name: "Login",
  computed:{
    ...mapGetters(["isLoggedIn", "token"])
  },
  data() {
    return {
      username: "gac",
      password: "fac5b2c9d9fe1d6cc567798868a6e02124a50f4d3d4330ea96a95ddb62e9673b"
    }
  },
  methods: {
    ...mapMutations(["setToken", "setIsLoggedIn"]),
    async login() {
      axios.post(`${process.env.VUE_APP_API_URL}/login`, {
        username: this.username,
        password: this.password
      }).then((response) => {
        const result = response.data;
        this.setToken(result.data.token || null);
        this.setIsLoggedIn((result.data.token.length > 0));
        this.$router.push("/");
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    if(this.isLoggedIn){
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
