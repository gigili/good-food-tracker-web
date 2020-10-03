<template>
  <v-card id="lateral">
    <v-row>
      <v-col
          cols="12"
          sm="6"
          xs="12"
          md="4"
          lg="4"
          class="px-15 ma-0"
          v-for="restaurant in restaurants"
          :key="restaurant.guid">
          <RestaurantCard :restaurant="restaurant"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import api from "@/helpers/api";
import RestaurantCard from "@/components/RestaurantCard";

export default {
  name: 'Home',
  mounted() {
    this.loadRestaurants();
  },
  components: {
    RestaurantCard
  },
  data(){
    return {
      restaurants: [],
      labels: {}
    }
  },
  methods:{
    loadRestaurants(){
      api(true).get("/restaurant").then(response => {
        this.restaurants = response.data.data;
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style>
  #lateral{
    height: 100%;
  }

  #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>
