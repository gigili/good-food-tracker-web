<template>
  <div>
    <v-alert type="error" border="left" v-if="error.length > 0">{{ error }}</v-alert>
    <v-alert type="info" border="left" v-if="message.length > 0">{{ message }}</v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertMessages",
  props: ["error", "message"]
}
</script>

<style scoped>

</style>
