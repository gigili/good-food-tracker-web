<template>
  <v-app>
    <v-row class="profile" no-gutters>
      <v-col cols="12" sm="12">
        <v-card class="pa-2" outlined tile rounded>
          <v-row>
            <v-col cols="12" sm="4" class="profileInformation">
              <v-avatar size="250">
                <img :src="profileImage" :alt="userData.name" id="profileImage"/>
              </v-avatar>
              <v-card-subtitle>{{ userData.username }}</v-card-subtitle>

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

              <AlertMessages :error="error" :message="message" class="mt-5"/>
              <span v-if="!isEditing">
                <v-card-subtitle><h1>{{ userData.name }}</h1></v-card-subtitle>
                <v-card-subtitle class="mt-0 pt-0">{{ userData.email }}</v-card-subtitle>
              </span>

              <span v-else>
                <v-row>
                  <v-col col="6" sm="12" class="px-15 ma-0">
                    <v-file-input
                        chips
                        :rules="imageUploadRules"
                        show-size
                        accept="image/png, image/jpeg, image/bmp"
                        v-model="newProfileImage"
                        :label="labels.profileImage"/>
                  </v-col>

                  <v-col cols="6" sm="12" class="px-15 ma-0">
                    <v-text-field
                        :label="labels.name"
                        type="text"
                        v-model="userData.name"/>
                  </v-col>

                  <v-col cols="6" sm="12" class="px-15 ma-0">
                    <v-text-field
                        :label="labels.email"
                        type="email"
                        v-model="userData.email"/>
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
import {mapGetters, mapMutations} from "vuex";
import api from "@/helpers/api";
import AlertMessages from "@/components/AlertMessages";
import utilities from "@/helpers/utilities";

export default {
  name: "Profile",
  mounted() {
    this.loadUserData();
  },
  components: {
    AlertMessages
  },
  computed: {
    ...mapGetters("AuthenticationStore", ["user"]),
    profileImage() {
      let value = null;

      if(this.userData && this.userData.image) {
        value = `${process.env.VUE_APP_API_URL}/${this.userData.image}`
      }

      return value;
    }
  },
  data() {
    return {
      error: "",
      message: "",
      isEditing: false,
      userData: {},
      labels: {
        name: this.translate("full_name"),
        email: this.translate("email"),
        profileImage: this.translate("select_profile_image"),
      },
      newProfileImage: null,
      imageUploadRules: [
        value => !value || value.size < 2000000 ||  utilities.format(this.translate("max_avatar_size"), 2),
      ],
    }
  },
  methods: {
    ...mapMutations("AuthenticationStore", ["setUser"]),
    enableEditing() {
      this.message = "";
      this.error = "";
      this.isEditing = true;
    },

    saveInformation() {
      this.user.name = this.userData.name;
      this.user.email = this.userData.email;

      const updateData = new FormData();
      updateData.append("name", this.userData.name);
      updateData.append("email", this.userData.email);

      let headers = {};
      if (this.newProfileImage !== null) {
        headers = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

        updateData.append("image", this.newProfileImage);
      }

      api(true).patch(`/profile/${this.user.guid}`, updateData, headers).then(response => {
        if (response.data.success) {
          this.message = this.translate("profile_information_updated_success")
          this.isEditing = false;
          this.loadUserData(true);
        } else {
          this.error = response.data.message;
        }
      }).catch(error => {
        this.error = error.response.data.message;
      });
    },

    loadUserData(isDataUpdated = false){
      const profileURL = `/profile/${this.user.guid}`;
      api(true).get(profileURL).then(response => {
        if(response.data.success){
          this.userData = response.data.data;
          if(isDataUpdated){
            this.setUser(this.userData);
          }
        }
      }).catch(error => {
        console.log(error.response);
      });
    }
  },
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
