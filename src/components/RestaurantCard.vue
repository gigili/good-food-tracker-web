<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate/>
    </template>

    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"/>
    <v-card-title class="pb-0">{{ restaurant.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0 pb-2 ps-0">
        <v-rating
            class="px-0"
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
        />
        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div>{{ restaurantDescription }}</div>
      <div>{{ translate("lbl_offers_delivery") }}
        <v-icon :color="offersDeliveryIconColor">{{offersDeliveryIcon}}</v-icon>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text>
        {{ translate("leave_a_review") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: ["restaurant"],
  mounted() {
    if(parseInt(this.restaurant.delivery) === 1){
      this.offersDeliveryIcon = "mdi-checkbox-marked-circle";
      this.offersDeliveryIconColor = "success";
    }
  },
  data: () => ({
    loading: false,
    selection: 1,
    offersDeliveryIcon: "mdi-cancel",
    offersDeliveryIconColor: "error"
  }),
  computed: {
    restaurantDescription() {
      let description = "";

      if (this.restaurant.address) {
        description = `this.restaurant.address | `;
      }

      if (this.restaurant.cityName) {
        description += `${this.restaurant.cityName}`;
        if (this.restaurant.countryName) {
          description += `, ${this.restaurant.countryName}`;
        }
      }
      return description;
    }
  },
  methods: {},
}
</script>

<style scoped>
  .v-rating{
    margin-left: -0.15rem;
  }
</style>
