<template>
  <v-app>
    <v-row class="profile" no-gutters>
      <v-col cols="12" sm="12">
        <v-card class="pa-2" outlined tile rounded>
          <v-row>
            <v-col cols="12" sm="4" class="profileInformation">
              <v-avatar size="250">
                <img :src="profileImage" :alt="user.name" id="profileImage"/>
              </v-avatar>
              <v-card-subtitle>{{ user.username }}</v-card-subtitle>

              <v-btn v-if="!isEditing" small outlined color="primary" dark @click="enableEditing">
                <span v-once>
                  {{ translate("edit_information") }}
                </span>
                <v-icon class="ml-2">mdi-pencil</v-icon>
              </v-btn>

              <v-btn v-else small outlined color="primary" dark @click="saveInformation">
                <span v-once>
                  {{ translate("save_information") }}
                </span>
                <v-icon class="ml-2">mdi-content-save</v-icon>
              </v-btn>

              <AlertMessages :error="error" :message="message"/>
              <span v-if="!isEditing">
                <v-card-subtitle><h1>{{ user.name }}</h1></v-card-subtitle>
                <v-card-subtitle class="mt-0 pt-0">{{ user.email }}</v-card-subtitle>
              </span>

              <span v-else>
                <v-row>
                  <v-col cols="6" sm="12" class="px-15 ma-0">
                    <v-text-field
                        :label="nameLabel"
                        type="text"
                        v-model="name"/>
                  </v-col>

                  <v-col cols="6" sm="12" class="px-15 ma-0">
                    <v-text-field
                        :label="emailLabel"
                        type="email"
                        v-model="email"/>
                  </v-col>
                </v-row>
              </span>
            </v-col>

            <v-col cols="12" sm="8">
              Show reviews here
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import axios from 'axios';
import AlertMessages from "@/components/AlertMessages";

export default {
  name: "Profile",
  mounted() {
    this.name = this.user.name;
    this.email = this.user.email;
  },
  components: {
    AlertMessages
  },
  computed: {
    ...mapGetters(["user", "token"]),
    profileImage() {
      return `${process.env.VUE_APP_API_URL}/${this.user.image}`
    },
  },
  data() {
    return {
      isEditing: false,
      name: "",
      email: "",
      nameLabel: this.translate("full_name"),
      emailLabel: this.translate("email"),
      error: "",
      message: ""
    }
  },
  methods: {
    enableEditing() {
      this.message = "";
      this.error = "";
      this.isEditing = true;
    },

    saveInformation() {
      this.user.name = this.name;
      this.user.email = this.email;

      const headers = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };

      axios.post(`${process.env.VUE_APP_API_URL}/profile/${this.user['guid']}`, {
        name: this.name,
        email: this.email
      }, headers).then(response => {
        if (response.data.success) {
          this.message = this.translate("profile_information_updated_success")
          this.isEditing = false;
        } else {
          this.error = response.data.message;
        }
      }).catch(error => {
        this.error = error.response.data.message;
      });
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 15px;
  background-color: #eee;
}

.profileInformation {
  text-align: center;
  align-items: center;
  align-content: center;
}
</style>
