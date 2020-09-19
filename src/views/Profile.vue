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
              <v-card-subtitle>{{user.username}}</v-card-subtitle>

              <v-btn v-if="!isEditing" small outlined color="primary" dark>
                {{ trn("edit_information") }}
                <v-icon class="ml-2">mdi-pencil</v-icon>
              </v-btn>

              <v-card-title>{{user.name}}</v-card-title>
              <v-card-subtitle>{{user.email}}</v-card-subtitle>
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

export default {
  name: "Profile",
  computed: {
    ...mapGetters(["user"]),
    profileImage() {
      return `${process.env.VUE_APP_API_URL}/${this.user.image}`
    }
  },
  data(){
    return {
      isEditing: false,
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
