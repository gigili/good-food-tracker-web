<template>
  <v-app class="pa-5">
    <v-row no-gutters>
      <v-col cols="12" sm="6" class="pa-5">
        <v-card class="pa-5" outlined tile>
          <h1>Register</h1>
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
          <v-text-field :label="trn('full_name')" :placeholder="trn('enter_full_name')" type="text" v-model="name"/>
          <v-text-field :label="trn('email')" :placeholder="trn('enter_email')" type="email" v-model="email"/>
          <v-text-field :label="trn('username')" autocomplete="off" :placeholder="trn('enter_username')" type="text"
                        v-model="username"/>
          <v-text-field :label="trn('password')" autocomplete="off" :placeholder="trn('enter_password')"
                        type="password"
                        v-model="password"/>
          <v-btn color="primary" @click.prevent="register">Register</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import utilities from "@/helpers/utilities";
import validation from "@/helpers/validation";
import axios from 'axios';

export default {
  name: "Register",
  computed:{
    ...mapGetters(["isLoggedIn", "token"])
  },
  mounted() {
    if(this.isLoggedIn){
      this.$router.push("/");
    }
  },
  data() {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
      message: "",
      error: ""
    }
  },
  methods: {
    register() {
      const validationResult = validation.validate([
        [this.name, this.trn("full_name"), ["required", {"min_length": 4}]],
        [this.email, this.trn("email"), ["required", "valid_email"]],
        [this.username, this.trn("username"), ["required"]],
        [this.password, this.trn("password"), ["required", "valid_password"]],
      ]);

      if (validationResult.length > 0) {
        this.error = validationResult;
        return false;
      } else {
        this.error = "";
      }

      const hashedPassword = utilities.hash(this.password);

      axios.post(`${process.env.VUE_APP_API_URL}/register`, {
        name: this.name,
        email: this.email,
        username: this.username,
        password: hashedPassword
      }).then((response) => {
        if (!response.data.success) {
          this.error = response.data.message;
        } else {
          this.message = response.data.message;

          this.clearInputs();
        }
      }).catch((err) => {
        this.error = err.response.data.message;
      });
    },
    clearInputs(){
      this.name ="";
      this.email = "";
      this.username = "";
      this.password = "";
    }
  }
}
</script>

<style scoped>
  .lipsum {
    margin-top: 15px;
  }
</style>
