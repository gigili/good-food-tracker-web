<template>
  <v-app class="pa-5">
    <v-row no-gutters>
      <v-col cols="12" sm="6" class="pa-5">
        <v-card class="pa-5" outlined tile>
          <h1 v-once>{{ translate("register") }}</h1>
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
          <v-text-field :label="labels.fullName" :placeholder="labels.enterFullName" type="text" v-model="name"/>
          <v-text-field :label="labels.email" :placeholder="labels.enterEmail" type="email" v-model="email"/>
          <v-text-field :label="labels.username" autocomplete="off" :placeholder="labels.enterUsername" type="text"
                        v-model="username"/>
          <v-text-field :label="labels.password" autocomplete="off"
                        :placeholder="labels.enterPassword"
                        type="password"
                        v-model="password"/>
          <v-btn color="primary" @click.prevent="register" v-once>{{ translate("register") }}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import utilities from "@/helpers/utilities";
import validation from "@/helpers/validation";
import api from "@/helpers/api";
import translate from "@/helpers/translation";

export default {
  name: "Register",
  computed: {
    ...mapGetters("AuthenticationStore", ["isLoggedIn"])
  },
  mounted() {
    if (this.isLoggedIn) {
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
      error: "",
      labels: {
        fullName: this.translate("full_name"),
        email: this.translate("email"),
        username: this.translate("username"),
        password: this.translate("password"),
        enterFullName: this.translate("enter_full_name"),
        enterEmail: this.translate("enter_email"),
        enterUsername: this.translate("enter_username"),
        enterPassword: this.translate("enter_password")
      }
    }
  },
  methods: {
    register() {
      const validationResult = validation.validate([
        [this.name, translate("full_name"), ["required", {"min_length": 4}]],
        [this.email, translate("email"), ["required", "valid_email"]],
        [this.username, translate("username"), ["required"]],
        [this.password, translate("password"), ["required", "valid_password"]],
      ]);

      if (validationResult.length > 0) {
        this.error = validationResult;
        return false;
      } else {
        this.error = "";
      }

      const hashedPassword = utilities.hash(this.password);

      api().post("/register", {
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
    clearInputs() {
      this.name = "";
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
